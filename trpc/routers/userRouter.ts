import { protectedProcedure, router } from '../init';
import { prisma } from '@/prisma/prisma';
import { mapUserToDTO, UserDTO } from '@/types/UserDTO';
import { z } from 'zod';

export const userRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }): Promise<UserDTO | null> => {
    const { user: authUser } = ctx;

    if (!authUser) {
      return null;
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: authUser.id },
      include: {
        company: {
          include: {
            Plan: true,
          },
        },
        department: true,
      },
    });

    if (!dbUser) {
      return null;
    }

    const user = {
      ...dbUser,
      ...authUser,
    };

    return mapUserToDTO(user);
  }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        companyId: z.string(),
        departmentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }): Promise<UserDTO | null> => {
      const { user: authUser } = ctx;

      if (!authUser) {
        return null;
      }

      const { id, name, companyId, departmentId } = input;

      const dbUser = await prisma.user.create({
        data: {
          id,
          fullname: name,
          companyId: companyId,
          departmentId: departmentId,
        },
        include: {
          company: {
            include: {
              Plan: true,
            },
          },
          department: true,
        },
      });

      const user = {
        ...dbUser,
        ...authUser,
      };

      return mapUserToDTO(user);
    }),
});
