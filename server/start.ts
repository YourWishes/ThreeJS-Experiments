import { serve } from "https://deno.land/std@0.87.0/http/server.ts";

const server = serve({ hostname: '0.0.0.0', port: 3000 });
const decoder = new TextDecoder('utf-8');

for await (const req of server) {
  let filePath = req.url;
  if(!filePath.length || filePath == '/') filePath = '/index.html';
  filePath = '.' + filePath;

  try {
    const data = await Deno.readFile(filePath);
    req.respond({ body: data });
  } catch (error) {
    if (error.name === Deno.errors.NotFound.name) {
      console.log('File "' + filePath + '" not found');
      req.respond({ status: 404, body: 'File not found' });
    } else {
      req.respond({ status: 500, body: 'Rest in pieces' });
      throw error;
    }
  }
}