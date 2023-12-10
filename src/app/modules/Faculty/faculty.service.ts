import { BAD_REQUEST } from 'http-status';
import QueryBuilder from '../../builder/QueryBuilders';
import AppError from '../../errors/AppError';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './facultyConstant';
import { TFaculty } from './faculty.interface';
import { startSession } from 'mongoose';
import { User } from '../user/user.model';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(
    id,
    { modifiedUpdateData },
    { new: true, runValidator: true },
  );
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty)
      throw new AppError(BAD_REQUEST, 'Failed to delete student');
    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) throw new AppError(BAD_REQUEST, 'Failed to delete user');
    session.commitTransaction();
    session.endSession();
    return deletedFaculty;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(BAD_REQUEST, 'Failed to delete student');
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
