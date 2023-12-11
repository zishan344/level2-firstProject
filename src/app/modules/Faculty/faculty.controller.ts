/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import httpStatus, { OK } from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'faculty are retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await FacultyServices.getSingleFacultyFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'faculty is retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;

  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await FacultyServices.deleteFacultyFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'faculty is deleted successfully',
        data: result,
      });
    } catch (err: any) {
      next(err);
    }
  },
);

export const facultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
