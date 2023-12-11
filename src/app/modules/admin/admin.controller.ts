/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import httpStatus, { OK } from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'admin are retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AdminServices.getSingleAdminFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'admin is retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AdminServices.deleteAdminFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'admin is deleted successfully',
        data: result,
      });
    } catch (err: any) {
      next(err);
    }
  },
);

export const adminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
