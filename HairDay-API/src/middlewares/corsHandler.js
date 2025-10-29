export function corsHandler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');

  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.writeHead(204).end();
  }
};
