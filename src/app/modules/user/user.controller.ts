/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await userService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
};
