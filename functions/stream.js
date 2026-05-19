// Cloudflare Pages Function - HTTP stream proxy එක
// URL: https://fzrholdings.github.io/ets-radio-player/stream

const STREAM_URL = 'http://176.227.215.27:5539/stream';

export async function onRequest(context) {
  const { request } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const streamResponse = await fetch(STREAM_URL, {
      headers: {
        'User-Agent': 'Cloudflare-Pages-Function',
      },
    });

    const responseHeaders = new Headers(corsHeaders);
    responseHeaders.set('Content-Type', 'audio/mpeg');
    responseHeaders.set('Cache-Control', 'no-cache');

    return new Response(streamResponse.body, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response('Proxy Error: ' + error.message, { 
      status: 500,
      headers: corsHeaders,
    });
  }
}
