import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.Validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicValidationSchema),
  academicSemesterController.createAcademicSemester,
);
router.get('/', academicSemesterController.getAcademicSemester);
router.get('/:semesterId', academicSemesterController.getSingAcademicSemester);
router.patch('/:semesterId', academicSemesterController.updateAcademicSemester);
export const AcademicSemesterRoutes = router;
