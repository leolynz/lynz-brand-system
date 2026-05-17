import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';

export const dynamic = 'force-dynamic';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const brandContext = await getBrandContext();

    console.log('AI Request received. Messages:', messages?.length);
    
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Missing OPENROUTER_API_KEY');
      return new Response(JSON.stringify({ error: 'Configuração de API ausente' }), { status: 500 });
    }

    const systemPrompt = `Você é o Assistente do Lynz Brand System, um especialista nas diretrizes da marca Lynz.
Seu objetivo é ajudar colaboradores e parceiros a entenderem e aplicarem corretamente a identidade da marca.

Abaixo estão as diretrizes da marca extraídas dos documentos oficiais (MDX):
---
${brandContext}
---

Use as informações acima para responder às perguntas. Se algo não estiver coberto nas diretrizes, informe que não tem essa informação específica e sugira entrar em contato com o time de branding.
Mantenha um tom de voz profissional, prestativo e alinhado com a personalidade da marca Lynz (consulte a seção de tom de voz se disponível).
Sempre responda em Português do Brasil.`;

    const result = await streamText({
      // Cast model to any because of version mismatch between @ai-sdk/openai and ai
      model: openrouter('google/gemma-2b-it') as any,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Error in AI Route:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
