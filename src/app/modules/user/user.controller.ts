/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await userService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: OK,
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
export const UserControllers = {
  createStudent,
};
