import { z } from 'zod';
import { procedure, router } from '../init';
import { prisma } from '@/prisma/prisma';
import { EventDTO, mapEventToDTO } from '@/types/EventDTO';

export const eventRouter = router({
  getAll: procedure.query(async (): Promise<EventDTO[]> => {
    const events = await prisma.event.findMany({
      include: { tags: true, participants: true },
    });
    return events.map(mapEventToDTO);
  }),
  getById: procedure.input(z.string()).query(async ({ input }): Promise<EventDTO | null> => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: { tags: true, participants: true },
    });
    return event ? mapEventToDTO(event) : null;
  }),
  create: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        city: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        startDate: z.date(),
        endDate: z.date(),
        minCapacity: z.number(),
        maxCapacity: z.number(),
        price: z.number(),
        ownerId: z.string(),
        images: z.array(z.string()),
      })
    )
    .mutation(async ({ input }): Promise<EventDTO> => {
      const event = await prisma.event.create({
        data: input,
        include: { tags: true, participants: true },
      });
      return mapEventToDTO(event);
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        city: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        minCapacity: z.number().optional(),
        maxCapacity: z.number().optional(),
        price: z.number().optional(),
        ownerId: z.string().optional(),
        images: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }): Promise<EventDTO> => {
      const { id, ...data } = input;
      const event = await prisma.event.update({
        where: { id },
        data,
        include: { tags: true, participants: true },
      });
      return mapEventToDTO(event);
    }),
  delete: procedure.input(z.string()).mutation(async ({ input }): Promise<EventDTO> => {
    const event = await prisma.event.delete({
      where: { id: input },
      include: { tags: true, participants: true },
    });
    return mapEventToDTO(event);
  }),
});
