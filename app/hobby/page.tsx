import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { trpc } from '@/trpc/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HobbyBadgesList from '@/components/hobbyBadgesList/HobbyBadgesList';

const page = async () => {
  const hobbyData = await trpc.hobby.getAll();
  const initialHobbies = await trpc.hobby.getSelected();
  const initialHobbyIds = initialHobbies.map((hobby) => hobby.id);

  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Choose your hobby</CardTitle>
          <CardDescription>
            Choose hobbies to get events that might be interesting for You in Your feed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HobbyBadgesList hobbies={hobbyData} initialHobbyIds={initialHobbyIds} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default page;
