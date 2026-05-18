import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let modelId = 'mistralai/mistral-7b-instruct:free'; // Ultimate stable fallback
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

    // ULTRA-SANITIZATION
    let apiKey = rawKey
      .replace(/^OPENROUTER_API_KEY[-=]/i, '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^["']|["']$/g, '')
      .trim();
    
    // Check if key format looks suspicious (OpenRouter keys should start with sk-or-v1-)
    const isGoogleKey = apiKey.startsWith('AIz');

    // Sanitize and fix common typos in model ID
    modelId = (process.env.OPENROUTER_MODEL || '')
      .trim()
      .replace(/^OPENROUTER_MODEL[-=]/i, '')
      .replace(/genna/i, 'gemma')
      .replace(/^["']|["']$/g, '');

    // AUTO-UPGRADE or FIX: 
    // If empty or gemma-2, use Mistral (more stable) or Gemma 3
    if (!modelId || modelId.includes('gemma-2-9b')) {
      modelId = 'mistralai/mistral-7b-instruct:free';
    }

    let modelInstance: any;

    // 2. Hybrid Logic based on Key Prefix
    if (isGoogleKey) {
      providerName = 'Google';
      const google = createGoogleGenerativeAI({ apiKey });
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
    const prefix = rawKey.substring(0, 6); // More prefix for better debug

    let customError = error.message || 'Erro Desconhecido';
    let hint = 'Tente usar "mistralai/mistral-7b-instruct:free" nas variáveis.';

    if (!rawKey.startsWith('sk-or-') && !rawKey.startsWith('AIz')) {
      hint = 'AVISO: Sua chave não parece uma chave do OpenRouter (deve começar com "sk-or-v1-"). Verifique se você não colou uma chave da OpenAI (sk-proj-...) ou do Google (AIz...).';
    }

    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${customError}`,
      details: `Modelo: "${modelId}", Provider: ${providerName}, Chave: "${prefix}..."`,
      hint: hint
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
