import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import { OK } from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  },
);
const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Academic semester fetched successfully',
    data: result,
  });
});
const getSingAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        semesterId,
      );
    sendResponse(res, {
      statusCode: OK,
      success: true,
      message: 'Academic semester fetched successfully',
      data: result,
    });
  },
);
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
    sendResponse(res, {
      statusCode: OK,
      success: true,
      message: 'Academic semester Updated successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingAcademicSemester,
  updateAcademicSemester,
};
