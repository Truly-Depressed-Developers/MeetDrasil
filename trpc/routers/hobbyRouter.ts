import { HobbyDTO, mapHobbyToDTO } from '@/types/HobbyDTO';
import { procedure, protectedProcedure, router } from '../init';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

export const hobbyRouter = router({
  getAll: procedure.query(async (): Promise<HobbyDTO[]> => {
    const hobbies = await prisma.hobby.findMany();
    return hobbies.map(mapHobbyToDTO);
  }),
  getSelected: protectedProcedure.query(async ({ ctx }): Promise<HobbyDTO[]> => {
    const userId = ctx.user.id;

    const hobbies = await prisma.hobby.findMany({
      where: {
        User: {
          some: {
            id: userId,
          },
        },
      },
    });

    return hobbies.map(mapHobbyToDTO);
  }),
  saveSelected: protectedProcedure
    .input(
      z.object({
        hobbyIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { hobbyIds } = input;

      // Get all current hobbies of the user
      const currentHobbies = await prisma.user.findUnique({
        where: { id: ctx.user.id },
        select: { hobbies: { select: { id: true } } },
      });

      const currentHobbyIds = currentHobbies?.hobbies.map((hobby) => hobby.id) || [];

      // Determine hobbies to disconnect
      const hobbiesToDisconnect = currentHobbyIds.filter((id) => !hobbyIds.includes(id));

      const updatedUser = await prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          hobbies: {
            disconnect: hobbiesToDisconnect.map((id) => ({ id })),
            connect: hobbyIds.map((id) => ({ id })),
          },
        },
        include: { hobbies: true },
      });

      return updatedUser.hobbies.map(mapHobbyToDTO);
    }),
});
