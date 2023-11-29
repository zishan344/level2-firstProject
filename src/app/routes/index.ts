import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
const router = express.Router();
const moduleRoute = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
