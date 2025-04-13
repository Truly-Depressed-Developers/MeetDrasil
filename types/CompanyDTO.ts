import type { Company, Department, Plan } from '@prisma/client';

export type CompanyDTO = {
  id: string;
  name: string;
  plan: PlanDTO;
};

export type DepartmentDTO = {
  id: string;
  name: string;
};

export type PlanDTO = {
  id: string;
  name: string;
};

export function mapCompanyToDTO(company: Company & { Plan: Plan }): CompanyDTO {
  return {
    id: company.id,
    name: company.name,
    plan: mapPlanToDTO(company.Plan),
  };
}

export function mapDepartmentToDTO(department: Department): DepartmentDTO {
  return {
    id: department.id,
    name: department.name,
  };
}
export function mapPlanToDTO(plan: Plan): PlanDTO {
  return {
    id: plan.id,
    name: plan.name,
  };
}
