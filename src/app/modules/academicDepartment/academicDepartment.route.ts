import express from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);
router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);
export const AcademicDepartmentRoutes = router;
