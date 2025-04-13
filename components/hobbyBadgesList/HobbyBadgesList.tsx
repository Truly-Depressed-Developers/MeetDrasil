'use client';

import React, { useState } from 'react';
import BadgeWithImage from '@/components/hobbyBadge/HobbyBadge';
import { Button } from '../ui/button';
import { trpc } from '@/trpc/client';
import { showToast } from '@/lib/showToast';
import { HobbyDTO } from '@/types/HobbyDTO';
import { redirect } from 'next/navigation';

type HobbyBadgesListProps = {
  hobbies: HobbyDTO[];
  initialHobbyIds: string[];
};

const HobbyBadgesList = ({ hobbies, initialHobbyIds }: HobbyBadgesListProps) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(initialHobbyIds);
  const utils = trpc.useContext();
  const saveSelected = trpc.hobby.saveSelected.useMutation({
    onSuccess() {
      utils.hobby.getAll.invalidate();
      utils.hobby.getSelected.invalidate();
    },
  });

  const toggleHobby = (hobbyId: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobbyId) ? prev.filter((id) => id !== hobbyId) : [...prev, hobbyId]
    );
  };

  const handleSave = async () => {
    saveSelected.mutate({ hobbyIds: selectedHobbies });
    await showToast({
      title: 'Hobbies saved',
      description: 'Your hobbies have been saved successfully.',
    });
    redirect('/');
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
      <Button className="rounded-full" onClick={handleSave}>
        Save and Continue
      </Button>
    </div>
  );
};

export default HobbyBadgesList;
