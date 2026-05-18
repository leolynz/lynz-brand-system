import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let modelId = 'google/gemma-3-27b-it:free'; // Default fallback (Gemma 3)
  let providerName = 'OpenRouter';

  try {
    // 1. Check Authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return new Response(JSON.stringify({ error: '[LOCAL_AUTH] Não autorizado' }), { status: 401 });
    }

    const { messages } = await req.json();
    const brandContext = await getBrandContext();
    
    let rawKey = (process.env.OPENROUTER_API_KEY || '').trim();
    
    if (!rawKey || rawKey.length < 10) {
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave de API inválida ou não encontrada' }), { status: 500 });
    }

    // ULTRA-SANITIZATION: Handle accidental "NAME-key" or "NAME=key" or "Bearer key"
    // Also remove any non-alphanumeric characters at the start (except AIz for Google)
    let apiKey = rawKey
      .replace(/^OPENROUTER_API_KEY[-=]/i, '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^["']|["']$/g, '')
      .trim();
    
    // Sanitize and fix common typos in model ID
    modelId = (process.env.OPENROUTER_MODEL || '')
      .trim()
      .replace(/^OPENROUTER_MODEL[-=]/i, '')
      .replace(/genna/i, 'gemma') // Fix common typo
      .replace(/^["']|["']$/g, '');

    let modelInstance: any;

    // 2. Hybrid Logic based on Key Prefix
    if (apiKey.startsWith('AIz')) {
      providerName = 'Google';
      const google = createGoogleGenerativeAI({ apiKey });
      // Using gemini-1.5-flash as it's the current stable free-tier model for Google
      modelId = 'gemini-1.5-flash';
      modelInstance = google(modelId);
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
      
      // Fallback to a very stable free model if the user-provided one fails
      if (!modelId) {
        modelId = 'google/gemma-3-27b-it:free';
      }
      modelInstance = openrouter(modelId);
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
    const rawKey = process.env.OPENROUTER_API_KEY || '';
    const prefix = rawKey.substring(0, 4);

    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Erro Desconhecido'}`,
      details: `Modelo: "${modelId}", Provider: ${providerName}, Chave: "${prefix}..."`,
      hint: 'Erro "Not Found" no OpenRouter geralmente significa que o modelo saiu do ar ou a chave está errada. Tente usar "mistralai/mistral-7b-instruct:free".'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
