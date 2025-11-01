import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export function create_user({ request, response, database }) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { name, email, password } = request.body;

  const existingUser = database.select('users', { email });

  if (existingUser.length > 0) {
    return response.writeHead(409).end(
      JSON.stringify({
        message: 'Email already in use.',
      })
    );
  }

  const password_hash = bcrypt.hashSync(password, saltRounds);

  const user = {
    id: randomUUID(),
    name,
    email,
    password: password_hash,
    created_at: new Date(),
  };


  database.insert('users', user);

  const payload = {
    id: user.id,
    name: user.name,
  }
  const token = jwt.sign(payload, JWT_SECRET, {});
  const { password: _, ...user_data } = user;

  return response.writeHead(201).end(
    JSON.stringify({
      message: 'Signup successful!',
      user: user.data,
      token: token,
    })
  );
};

export function login_user({ request, response, database }) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const { email, password } = request.body;

  const [user] = database.select('users', { email });

  if (!user) {
    return response.writeHead(401).end(
      JSON.stringify({
        message: 'Invalid credentials.',
      })
    );
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return response.writeHead(401).end(
      JSON.stringify({
        message: 'Invalid credentials.',
      })
    );
  }

  const payload = {
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(payload, JWT_SECRET, {});

  const { password: _, ...user_data } = user;

  return response.writeHead(200).end(
    JSON.stringify({
      message: 'Login successful!',
      user: user_data,
      token: token,
    })
  );
}

export function get_users({ request, response, database }) {
  const { status } = request.query;

  const filters = status ? { status } : null;

  const users = database.select('users',  filters);

  return response.end(JSON.stringify(users));
};

export function remove_user({ request, response, database }) {
  const { id } = request.params;

  database.delete('users', id);

  return response.end();
};

export function update_user({ request, response, database }) {
  const { id } = request.params;
  const { name, email, password } = request.body;

  database.update('users', id, {
    name,
    email,
    password,
    updated_at: new Date(),
  });

  return response.end();
};
