import { randomUUID } from 'node:crypto';

export function create_schedule({ request, response, database }) {
  const { customer_id, scheduled_for, barber } = request.body;

  if (!customer_id || !scheduled_for || !barber) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: 'customer_id, barber and scheduled_for are required',
      })
    );
  };

  const [customer] = database.select('users', { id: customer_id });

  if (!customer) {
    return response.writeHead(404).end(
      JSON.stringify({
        message: `Customer with ID ${customer_id} not found.`,
      })
    );
  }

  const schedule = {
    id: randomUUID(),
    customer_id,
    customer_name: customer.name,
    customer_email: customer.email,
    barber,
    scheduled_for,
    created_at: new Date(),
  };

  database.insert('schedules', schedule);

  return response.writeHead(201).end(JSON.stringify(schedule));
};

export function get_schedules({ request, response, database }) {
  const { status } = request.query;

  const filters = status ? { status } : null;

  const schedules = database.select('schedules', filters);

  return response.end(JSON.stringify(schedules));
};

export function remove_schedule({ request, response, database }) {
  const { id } = request.params;

  database.delete('schedules', id);

  return response.end();
};
