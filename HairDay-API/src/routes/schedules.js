import { create_schedule, get_schedules, remove_schedule } from "../controllers/schedulesController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";


export const schedules = [
  {
    method: 'POST',
    path: '/schedules',
    middleware: ensureAuthenticated,
    controller: create_schedule,
  },
  {
    method: 'GET',
    path: '/schedules',
    middleware: ensureAuthenticated,
    controller: get_schedules,
  },
  {
    method: 'DELETE',
    path: '/schedules/:id',
    middleware: ensureAuthenticated,
    controller: remove_schedule,
  }

]
