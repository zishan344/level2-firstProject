/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'faculty is created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'admin is created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
