import express from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/:id', facultyControllers.getSingleFaculty);

router.delete('/:id', facultyControllers.deleteFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.get('/', facultyControllers.getAllFaculties);

export const FacultyRoutes = router;
