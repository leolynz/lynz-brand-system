import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Check Authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return new Response(JSON.stringify({ error: '[LOCAL_AUTH] Não autorizado' }), { status: 401 });
    }

    const { messages } = await req.json();
    const brandContext = await getBrandContext();
    
    let rawKey = process.env.OPENROUTER_API_KEY || '';
    
    if (!rawKey) {
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave de API não encontrada' }), { status: 500 });
    }

    // ULTRA-SANITIZATION: Handle accidental "NAME-key" or "NAME=key" or "Bearer key"
    let apiKey = rawKey.trim()
      .replace(/^OPENROUTER_API_KEY[-=]/i, '') // Fixes the hyphen/equal error
      .replace(/^Bearer\s+/i, '')
      .replace(/^["']|["']$/g, '');
    
    const modelId = process.env.OPENROUTER_MODEL || '';
    let modelInstance: any;

    // 2. Hybrid Logic based on Key Prefix
    if (apiKey.startsWith('AIz')) {
      console.log('Detected Google Key. Using Google Provider.');
      const google = createGoogleGenerativeAI({ apiKey });
      // Using gemini-1.0-pro as it's more stable for all key types
      modelInstance = google('gemini-1.0-pro');
    } else {
      console.log('Detected OpenRouter/Other Key.');
      const openrouter = createOpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        headers: {
          'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
          'X-Title': 'Lynz Brand System',
        }
      });
      modelInstance = openrouter(modelId || 'google/gemma-2-9b-it:free');
    }

    const systemPrompt = `Você é o "Lynz Brand System Assistant", estrategista de marca da Lynz.
Sua missão é ajudar a encontrar ativos e PLANEJAR estratégias com base nas diretrizes abaixo.

DIRETRIZES:
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Responda sempre em Português do Brasil.`;

    const result = await streamText({
      model: modelInstance,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('AI ROUTE ERROR:', error);
    const prefix = (process.env.OPENROUTER_API_KEY || '').substring(0, 4);
    
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Erro Desconhecido'}`,
      details: `Chave detectada começa com "${prefix}".`,
      hint: 'Se você colou a chave do OpenRouter, garanta que ela comece com "sk-or". Se a Vercel ainda mostrar "AIza", você precisa deletar a variável, salvar e dar REDEPLOY sem cache.'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
