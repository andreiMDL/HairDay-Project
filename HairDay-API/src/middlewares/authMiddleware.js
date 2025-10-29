import jwt from 'jsonwebtoken';

export function ensureAuthenticated(request, response, next) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return response.writeHead(401).end(JSON.stringify({ message: 'Token not provided' }));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return response.writeHead(401).end(JSON.stringify({ message: 'Token malformatted.' }));
  }

  if (!JWT_SECRET) {
      console.error('ERRO CRÍTICO: JWT_SECRET não carregada no middleware.');
      return response.writeHead(500).end(JSON.stringify({ message: 'Internal server error: Key missing.' }));
    }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    request.userId = decoded.id;
    next();
  } catch (error) {
    console.error('JWT Verification Error: ', error.message);
    return response.writeHead(403).end(JSON.stringify({ message: 'Invalid or expired token.' }));
  }
}
