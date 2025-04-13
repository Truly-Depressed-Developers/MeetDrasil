import { procedure, router } from '../init';
import { prisma } from '@/prisma/prisma';
import { CompanyDTO, DepartmentDTO, mapCompanyToDTO, mapDepartmentToDTO } from '@/types/CompanyDTO';

export const companyRouter = router({
  getCompanies: procedure.query(async (): Promise<CompanyDTO[]> => {
    const companies = await prisma.company.findMany({
      include: {
        Plan: true,
      },
    });
    return companies.map(mapCompanyToDTO);
  }),
  getDepartments: procedure.query(async (): Promise<DepartmentDTO[]> => {
    const departments = await prisma.department.findMany();
    return departments.map(mapDepartmentToDTO);
  }),
});
