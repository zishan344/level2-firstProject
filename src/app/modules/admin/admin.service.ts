import { BAD_REQUEST } from 'http-status';
import QueryBuilder from '../../builder/QueryBuilders';
import AppError from '../../errors/AppError';

import { startSession } from 'mongoose';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { AdminSearchableFields } from './adminConstant';
import { TAdmin } from './admin.interface';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await AdminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin)
      throw new AppError(BAD_REQUEST, 'Failed to delete Admin');
    // get user _id from deletedFaculty
    const userId = deletedAdmin.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) throw new AppError(BAD_REQUEST, 'Failed to delete user');
    session.commitTransaction();
    session.endSession();
    return deletedAdmin;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(BAD_REQUEST, 'Failed to delete student');
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
