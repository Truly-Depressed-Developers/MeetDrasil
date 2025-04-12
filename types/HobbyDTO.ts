import { Hobby } from '@prisma/client';

export interface HobbyDTO {
  id: string;
  name: string;
}

export function mapHobbyToDTO(hobby: Hobby): HobbyDTO {
  return {
    id: hobby.id,
    name: hobby.name,
  };
}
