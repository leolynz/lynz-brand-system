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
      console.error('Auth Check Failed: No user session found');
      return new Response(JSON.stringify({ error: '[LOCAL_AUTH] Sessão expirada ou não autorizado' }), { status: 401 });
    }

    const { messages } = await req.json();
    const brandContext = await getBrandContext();
    
    // Get the raw key directly from process.env
    const rawKey = process.env.OPENROUTER_API_KEY || '';
    
    if (!rawKey) {
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave OPENROUTER_API_KEY não encontrada no Vercel.' }), { status: 500 });
    }

    // Sanitize
    const apiKey = rawKey.trim().replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '');
    const modelId = process.env.OPENROUTER_MODEL || '';

    let modelInstance: any;

    // 2. Hybrid Logic based on Key Prefix
    if (apiKey.startsWith('AIz')) {
      console.log('Using GOOGLE Provider with key starting with AIz');
      const google = createGoogleGenerativeAI({ apiKey });
      
      // For Google AI Studio keys, we use gemini-1.5-flash as default
      modelInstance = google('gemini-1.5-flash');
    } else {
      console.log('Using OPENROUTER Provider with key starting with', apiKey.substring(0, 5));
      const openrouter = createOpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        headers: {
          'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
          'X-Title': 'Lynz Brand System',
        }
      });
      
      // For OpenRouter, use gemma-2-9b or gemma-7b
      const finalModelId = modelId || 'google/gemma-2-9b-it:free';
      modelInstance = openrouter(finalModelId);
    }

    const systemPrompt = `Você é o "Lynz Brand System Assistant", o estrategista de marca oficial e assistente proativo da Lynz.

SUA MISSÃO:
Sua missão é ser o guardião da identidade Lynz. Ajude proativamente a:
1. Encontrar ativos e entender diretrizes.
2. PLANEJAR estratégias: Se pedirem ideias de posts ou campanhas, sugira como usar as diretrizes (tom de voz, cores, tipos).

DIRETRIZES CARREGADAS:
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Responda sempre em Português do Brasil de forma inspiradora e técnica.`;

    const result = await streamText({
      model: modelInstance,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('FULL AI ROUTE ERROR:', error);
    
    // Provide a very detailed error to help the user identify the provider being hit
    const apiKeyPrefix = (process.env.OPENROUTER_API_KEY || '').substring(0, 4);
    
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Erro Desconhecido'}`,
      details: `O servidor está usando uma chave que começa com "${apiKeyPrefix}".`,
      hint: 'Se você quer usar o OpenRouter, a chave deve começar com "sk-or". Se começar com "AIza", o sistema usará o Gemini automaticamente.'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
