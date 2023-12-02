import { TAcademicSemester } from '../academicSemester/academicSemester.Interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  console.log(payload);
  const currentId = (await findLastStudentId()) || (0).toString();
  console.log(await findLastStudentId());
  /*  let incrementId = Number(currentId + 1)
    .toString()
    .padStart(4, '0'); */
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  console.log('increment', incrementId);
  return incrementId;
};
