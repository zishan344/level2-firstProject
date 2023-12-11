import express from 'express';

import { courseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();
router.post('/create-course', courseControllers.createCourse);
router.get('/:id', courseControllers.getSingleCourse);

router.delete('/:id', courseControllers.deleteCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

router.get('/', courseControllers.getAllCourse);
export const CourseRoute = router;
