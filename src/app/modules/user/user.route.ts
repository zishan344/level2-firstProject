import express from 'express';
import { UserControllers } from './user.controller';

import { createStudentValidationSchema } from '../student/student.validation';

import studentValidation from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  studentValidation(createStudentValidationSchema),
  UserControllers.createStudent,
);
export const userRoute = router;
