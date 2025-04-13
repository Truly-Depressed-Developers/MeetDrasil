import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password has to be at least 8 characters long' }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Full name is required' }),
    company: z.string().min(1, { message: 'Company is required' }),
    department: z.string().min(1, { message: 'Department is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password has to be at least 8 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords have to be the same',
    path: ['confirmPassword'],
  });

export const resetSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});
