// Cloudflare Pages Function - HTTP stream proxy
const STREAM_URL = 'http://176.227.215.27:5539/stream';

export async function onRequest(context) {
  const { request } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'audio/mpeg',
  };

  try {
    const streamResponse = await fetch(STREAM_URL, {
      headers: { 'User-Agent': 'Cloudflare-Pages-Function' },
    });

    return new Response(streamResponse.body, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
