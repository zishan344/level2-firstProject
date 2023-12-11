/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CourseService } from './course.service';
import httpStatus, { OK } from 'http-status';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'course created successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await CourseService.getSingleCourseFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'course is retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseService.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await CourseService.deleteCourseFromDB(id);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'course is deleted successfully',
        data: result,
      });
    } catch (err: any) {
      next(err);
    }
  },
);

export const courseControllers = {
  createCourse,
  updateCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
