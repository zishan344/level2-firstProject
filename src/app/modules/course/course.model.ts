import { Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';
import { model } from 'mongoose';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: Schema.Types.ObjectId,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credit: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
});
export const Course = model<TCourse>('Course', courseSchema);
