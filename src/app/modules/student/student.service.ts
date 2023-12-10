import { startSession } from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { BAD_REQUEST } from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilders';
import { studentSearchableField } from './studentConstant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const queryObj = { ...query };

  /*   const searchQuery = Student.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  }); */

  /*   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((ele) => delete queryObj[ele]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const limitQuery = sortQuery.limit(limit);
  const skipQuery = limitQuery.skip(skip);
  // field filtering
  let selectField = '';
  if (query.fields) {
    selectField = (query.fields as string).split(',').join(' ');
  }
  const filedFiltering = await skipQuery.select(selectField); */
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { id },
    { modifiedUpdateData },
    { new: true, runValidator: true },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent)
      throw new AppError(BAD_REQUEST, 'Failed to delete student');
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) throw new AppError(BAD_REQUEST, 'Failed to delete user');
    session.commitTransaction();
    session.endSession();
    return deleteStudent;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
