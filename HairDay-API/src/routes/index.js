import { parseRoutePath } from "../utils/parseRoutePath.js";
import { users } from "./users.js";
import { schedules } from "./schedules.js";

export const routes = [...users, ...schedules].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
