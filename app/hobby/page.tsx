import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { trpc } from '@/trpc/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import HobbyBadgesList from '@/components/hobbyBadgesList/HobbyBadgesList';

const page = async () => {
  const hobbyData = await trpc.hobby.getAll();

  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Choose your hobby</CardTitle>
          <CardDescription className="text-lg">
            Choose hobbies to get events that might be interesting for You in Your feed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HobbyBadgesList hobbies={hobbyData} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default page;
