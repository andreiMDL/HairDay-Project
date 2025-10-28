import { create_user, get_users, login_user, remove_user, update_user } from "../controllers/usersController.js";

export const users = [
  {
    method: 'POST',
    path: '/users',
    controller: create_user,
  },
  {
    method: 'POST',
    path: '/login',
    controller: login_user,
  },
  {
    method: 'GET',
    path: '/users',
    controller: get_users,
  },
  {
    method: 'PUT',
    path: '/users/:id',
    controller: update_user,
  },
  {
    method: 'DELETE',
    path: '/users/:id',
    controller: remove_user,
  }

]
