import express from 'express';
import { adminControllers } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/:id', adminControllers.getSingleAdmin);

router.delete('/:id', adminControllers.deleteAdmin);
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin,
);

router.get('/', adminControllers.getAllAdmin);
export const AdminRoutes = router;
