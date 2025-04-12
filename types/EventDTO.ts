import { Event, Hobby, User } from '@prisma/client';

export type EventDTO = {
  id: string;
  name: string;
  description: string;
  city: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  minCapacity: number;
  maxCapacity: number;
  price: number;
  ownerId: string;
  images: string[];
  tags: TagDTO[];
  participants: ParticipantDTO[];
};

export type TagDTO = {
  id: string;
  name: string;
};

export type ParticipantDTO = {
  id: string;
  fullname: string | null;
};

export function mapEventToDTO(event: Event & { tags: Hobby[]; participants: User[] }): EventDTO {
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    city: event.city,
    latitude: event.latitude,
    longitude: event.longitude,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    minCapacity: event.minCapacity,
    maxCapacity: event.maxCapacity,
    price: event.price,
    ownerId: event.ownerId,
    images: event.images,
    tags: event.tags.map(mapTagToDTO),
    participants: event.participants.map(mapParticipantToDTO),
  };
}

export function mapTagToDTO(tag: Hobby): TagDTO {
  return {
    id: tag.id,
    name: tag.name,
  };
}

export function mapParticipantToDTO(participant: User): ParticipantDTO {
  return {
    id: participant.id,
    fullname: participant.fullname,
  };
}
