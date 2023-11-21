import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(255)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First name must start with an uppercase letter',
    }),
  middleName: z.string().min(1).max(255),
  lastName: z
    .string()
    .min(1)
    .max(255)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'Last name must start with an uppercase letter',
    }),
})

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(20), // Adjust the max length as needed
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(20), // Adjust the max length as needed
})

const localGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20), // Adjust the max length as needed
  address: z.string().min(1).max(255),
})

const studentValidationSchema = z.object({
  id: z.string().min(1).max(255),
  name: userNameValidationSchema,
  gender: z
    .enum(['male', 'female'])
    .refine((value) => typeof value === 'string', {
      message: 'Gender must be a string',
    }),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1).max(20), // Adjust the max length as needed
  emergencyContactNo: z.string().min(1).max(20), // Adjust the max length as needed
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1).max(255),
  permanentAddress: z.string().min(1).max(255),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().min(1).max(255),
  isActive: z.enum(['active', 'blocked']).default('active'),
})

export default studentValidationSchema
