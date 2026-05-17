import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';
import { getSupabaseConfig } from '@/lib/supabase/config';

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

    // Safe debugging: Log only the keys, never the values!
    const availableKeys = Object.keys(process.env).filter(k => 
      k.includes('OPENROUTER') || k.includes('SUPABASE')
    );
    console.log('Server-side check - Available keys:', availableKeys);
    console.log('Brand Context size:', brandContext?.length || 0);
    
    let apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY');
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave OPENROUTER_API_KEY não encontrada' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize API Key: remove spaces, quotes, and 'Bearer ' prefix if accidentally included
    apiKey = apiKey.trim().replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '');
    
    // SAFE LOG: Check only parts of the key for verification
    console.log('API Key Verification:');
    console.log('- Length:', apiKey.length);
    console.log('- Starts with:', apiKey.substring(0, 7));
    console.log('- Ends with:', apiKey.substring(apiKey.length - 4));
    console.log('- Raw starts with sk-or:', apiKey.startsWith('sk-or'));

    // 2. Initialize Provider inside the handler to ensure env vars are fresh
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey
    });

    const systemPrompt = `Você é o Assistente do Lynz Brand System, um especialista nas diretrizes da marca Lynz.
Seu objetivo é ajudar colaboradores e parceiros a entenderem e aplicarem corretamente a identidade da marca.

Abaixo estão as diretrizes da marca extraídas dos documentos oficiais (MDX):
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Use as informações acima para responder às perguntas. Se algo não estiver coberto nas diretrizes, informe que não tem essa informação específica e sugira entrar em contato com o time de branding.
Mantenha um tom de voz profissional, prestativo e alinhado com a personalidade da marca Lynz.
Sempre responda em Português do Brasil.`;

    const modelId = process.env.OPENROUTER_MODEL || 'google/gemma-2-9b-it:free';
    console.log('Using AI model:', modelId);

    const result = await streamText({
      model: openrouter(modelId) as any,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Error in AI Route:', error);
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Internal Server Error'}`
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
