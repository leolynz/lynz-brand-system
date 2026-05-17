import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';

export const dynamic = 'force-dynamic';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://lynz-brand-system.vercel.app', // Optional, for OpenRouter rankings
    'X-Title': 'Lynz Brand System', // Optional, for OpenRouter rankings
  }
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const brandContext = await getBrandContext();

    console.log('AI Request received. Messages:', messages?.length);
    
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Missing OPENROUTER_API_KEY');
      return new Response(JSON.stringify({ error: 'Configuração de API (OPENROUTER_API_KEY) ausente no ambiente.' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!brandContext) {
      console.warn('Warning: brandContext is empty. Check if MDX files are being read correctly.');
    }

    const systemPrompt = `Você é o Assistente do Lynz Brand System, um especialista nas diretrizes da marca Lynz.
Seu objetivo é ajudar colaboradores e parceiros a entenderem e aplicarem corretamente a identidade da marca.

Abaixo estão as diretrizes da marca extraídas dos documentos oficiais (MDX):
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Use as informações acima para responder às perguntas. Se algo não estiver coberto nas diretrizes, informe que não tem essa informação específica e sugira entrar em contato com o time de branding.
Mantenha um tom de voz profissional, prestativo e alinhado com a personalidade da marca Lynz (consulte a seção de tom de voz se disponível).
Sempre responda em Português do Brasil.`;

    const result = await streamText({
      // Use gemma-7b-it as it's more reliable than 2b for brand guidelines
      model: openrouter('google/gemma-7b-it:free') as any,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Error in AI Route:', error);
    // Return detailed error for debugging
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal Server Error',
      details: error.toString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
