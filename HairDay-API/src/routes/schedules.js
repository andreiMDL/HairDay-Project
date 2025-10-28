import { create_schedule, get_schedules, remove_schedule } from "../controllers/schedulesController.js";


export const schedules = [
  {
    method: 'POST',
    path: '/schedules',
    controller: create_schedule,
  },
  {
    method: 'GET',
    path: '/schedules',
    controller: get_schedules,
  },
  {
    method: 'DELETE',
    path: '/schedules/:id',
    controller: remove_schedule,
  }

]
