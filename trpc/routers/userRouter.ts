import { protectedProcedure, router } from '../init';
import { prisma } from '@/prisma/prisma';
import { mapUserToDTO, UserDTO } from '@/types/UserDTO';

export const userRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }): Promise<UserDTO> => {
    const { user: authUser } = ctx;
    const dbUser = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    const company = dbUser.companyId
      ? await prisma.company.findUnique({
          where: { id: dbUser.companyId },
        })
      : null;

    const user = {
      ...dbUser,
      ...authUser,
      companyName: company?.name || '',
      companyPlan: 'basic',
    };

    return mapUserToDTO(user);
  }),
});
