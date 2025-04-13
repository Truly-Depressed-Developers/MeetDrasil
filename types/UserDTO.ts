import { User } from '@prisma/client';

export interface UserDTO {
  id: string;
  name: string;
  email?: string;
  isAnonymous?: boolean;
  companyName: string;
  companyPlan: string;
}

export interface AuthUser {
  id: string;
  email: string | undefined;
  isAnonymous: boolean | undefined;
  companyName: string;
  companyPlan: string;
}

export function mapUserToDTO(user: User & AuthUser): UserDTO {
  return {
    id: user.id,
    name: user.fullname ?? '',
    email: user.email,
    isAnonymous: user.isAnonymous,
    companyName: user.companyName,
    companyPlan: user.companyPlan,
  };
}
