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

    const user = {
      ...dbUser,
      ...authUser,
    };

    return mapUserToDTO(user);
  }),
});
