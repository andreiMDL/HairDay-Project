import { randomUUID } from 'node:crypto';

export function create_schedule({ request, response, database }) {
  const user_id =  request.userId;

  const { scheduled_for, barber } = request.body;

  if (!scheduled_for || !barber) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: 'user_id, barber and scheduled_for are required',
      })
    );
  };

  const [user] = database.select('users', { id: user_id });

  if (!user) {
    return response.writeHead(500).end(
      JSON.stringify({
        message: `User data not found for valid token ID: ${user_id}.`,
      })
    );
  }

  const schedule = {
    id: randomUUID(),
    user_id,
    user_name: user.name,
    user_email: user.email,
    barber,
    scheduled_for,
    created_at: new Date(),
  };

  database.insert('schedules', schedule);

  return response.writeHead(201).end(JSON.stringify(schedule));
};

export function get_schedules({ request, response, database }) {
  const user_id = request.userId;

  if (!user_id) {
    return response.writeHead(500).end(JSON.stringify({ message: 'Authentication context missing.' }));
  }

  const filters = { user_id: user_id };

  const { status } = request.query;
  if (status) {
    filters.status = status;
  }

  const userSchedules = database.select('schedules', filters);

  return response.end(JSON.stringify(userSchedules));
};

export function remove_schedule({ request, response, database }) {
  const { id } = request.params;

  database.delete('schedules', id);

  return response.end();
};
