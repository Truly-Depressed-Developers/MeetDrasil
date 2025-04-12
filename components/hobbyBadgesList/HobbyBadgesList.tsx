'use client';

import React, { useState } from 'react';
import BadgeWithImage from '@/components/hobbyBadge/HobbyBadge';
import { Button } from '../ui/button';

type HobbyBadgesListProps = {
  hobbies: {
    id: string;
    name: string;
    image_url: string;
  }[];
};

const HobbyBadgesList = ({ hobbies }: HobbyBadgesListProps) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const toggleHobby = (hobbyId: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobbyId) ? prev.filter((id) => id !== hobbyId) : [...prev, hobbyId]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-x-1">
        {hobbies.map((hobby) => (
          <li
            key={hobby.id}
            className="flex cursor-pointer flex-wrap items-center gap-3 rounded-full px-3 py-2"
            onClick={() => toggleHobby(hobby.id)}
          >
            <BadgeWithImage
              name={hobby.name}
              imageUrl={hobby.image_url}
              isActive={selectedHobbies.includes(hobby.id)}
            />
          </li>
        ))}
      </ul>
      <Button>Save and Continue</Button>
    </div>
  );
};

export default HobbyBadgesList;
