/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus, { OK } from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;

      const result = await StudentServices.getSingleStudentFromDB(studentId);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'student is retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;

      const result = await StudentServices.deleteStudentFromDB(studentId);
      sendResponse(res, {
        statusCode: OK,
        success: true,
        message: 'student is deleted successfully',
        data: result,
      });
    } catch (err: any) {
      next(err);
    }
  },
);

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
