import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getAllDepartmentFromDB();
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Fetched All Department successfully',
      data: result,
    });
  },
);
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    const result =
      await academicDepartmentService.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Fetched Academic Department successfully',
      data: result,
    });
  },
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    const result =
      await academicDepartmentService.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Update Academic Department successfully',
      data: result,
    });
  },
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
