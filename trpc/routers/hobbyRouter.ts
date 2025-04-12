import { HobbyDTO, mapHobbyToDTO } from '@/types/HobbyDTO';
import { procedure, router } from '../init';
import { prisma } from '@/prisma/prisma';

export const hobbyRouter = router({
  getAll: procedure.query(async (): Promise<HobbyDTO[]> => {
    const hobbies = await prisma.hobby.findMany();
    return hobbies.map(mapHobbyToDTO);
  }),
});
