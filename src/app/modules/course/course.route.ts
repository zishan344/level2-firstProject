import express from 'express';

import { courseControllers } from './course.controller';

const router = express.Router();
router.post('/create-course', courseControllers.createCourse);
router.get('/:id', courseControllers.getSingleCourse);

router.delete('/:id', courseControllers.deleteCourse);
/* router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  courseControllers.updateAdmin,
); */

router.get('/', courseControllers.getAllCourse);
export const CourseRoute = router;
