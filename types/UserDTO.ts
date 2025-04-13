import { Company, Department, Plan, User } from '@prisma/client';
import { CompanyDTO, DepartmentDTO, mapCompanyToDTO, mapDepartmentToDTO } from '@/types/CompanyDTO';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  company: CompanyDTO;
  department: DepartmentDTO;
}

export interface AuthUser {
  id: string;
  email: string | undefined;
  isAnonymous: boolean | undefined;
}

export function mapUserToDTO(
  user: User & AuthUser & { company: Company & { Plan: Plan }; department: Department }
): UserDTO {
  return {
    id: user.id,
    name: user.fullname,
    email: user.email ?? '',
    company: mapCompanyToDTO(user.company),
    department: mapDepartmentToDTO(user.department),
  };
}
