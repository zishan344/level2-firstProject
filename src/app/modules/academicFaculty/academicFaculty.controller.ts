import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Faculty created successfully',
      data: result,
    });
  },
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAllFacultyFromDB();
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Fetched All Faculty successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Fetched Faculty successfully',
      data: result,
    });
  },
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: OK,
      message: 'Update Faculty successfully',
      data: result,
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
