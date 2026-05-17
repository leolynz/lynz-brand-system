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
      .replace(/^OPENROUTER_API_KEY[-=]/i, '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^["']|["']$/g, '');
    
    // Sanitize and fix common typos in model ID
    let modelId = (process.env.OPENROUTER_MODEL || '')
      .trim()
      .replace(/^OPENROUTER_MODEL[-=]/i, '')
      .replace(/genna/i, 'gemma') // Fix common typo
      .replace(/^["']|["']$/g, '');

    let modelInstance: any;
    let providerName = '';

    // 2. Hybrid Logic based on Key Prefix
    if (apiKey.startsWith('AIz')) {
      providerName = 'Google';
      const google = createGoogleGenerativeAI({ apiKey });
      // Using gemini-1.0-pro as it's more stable for all key types
      modelInstance = google('gemini-1.0-pro');
      modelId = 'gemini-1.0-pro';
    } else {
      providerName = 'OpenRouter';
      const openrouter = createOpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        headers: {
          'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
          'X-Title': 'Lynz Brand System',
        }
      });
      
      const finalModelId = modelId || 'google/gemma-2-9b-it:free';
      modelId = finalModelId;
      modelInstance = openrouter(finalModelId);
    }

    console.log(`Attempting AI stream with ${providerName} using model: ${modelId}`);

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
    const usedModel = process.env.OPENROUTER_MODEL || 'google/gemma-2-9b-it:free';
    
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Erro Desconhecido'}`,
      details: `Chave: "${prefix}...", Modelo: "${usedModel}"`,
      hint: 'Se o erro for "Not Found", o ID do modelo na Vercel pode estar errado (ex: "genna" em vez de "gemma"). Verifique também se há hífens no nome da variável.'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
