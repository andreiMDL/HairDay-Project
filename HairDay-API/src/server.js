import 'dotenv/config';
import http from 'node:http';

import { jsonHandler } from './middlewares/jsonHandler.js';
import { routeHandler } from './middlewares/routeHandler.js';
import { corsHandler } from './middlewares/corsHandler.js';

async function listener(request, response) {
  corsHandler(request, response);

  if (request.method === 'OPTIONS') {
    return;
  }

  await jsonHandler(request, response);
  routeHandler(request, response);
};

http.createServer(listener).listen(3000);
