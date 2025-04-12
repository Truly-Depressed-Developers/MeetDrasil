'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { showToast } from '@/lib/showToast';

type Props = {
  id: string;
};

export default function EventCard({ id }: Props) {
  const { data: event, isLoading } = trpc.event.getById.useQuery(id);
  const utils = trpc.useUtils();
  const { data: currentUser } = trpc.user.getCurrent.useQuery();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const assignParticipant = trpc.event.assignParticipant.useMutation({
    onSuccess(input) {
      utils.event.getAll.invalidate();
      utils.event.getById.invalidate(input.id);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  const participantsRequired = event.minCapacity - event.participants.length;
  const isCurrentUserAssigned = event.participants.some((p) => p.id === currentUser?.id);

  const handleSignUp = async () => {
    setButtonDisabled(true);
    await assignParticipant.mutateAsync({
      eventId: event.id,
      assigned: !isCurrentUserAssigned,
    });

    await showToast({
      title: isCurrentUserAssigned ? 'Cancelled' : 'Signed up',
      description: isCurrentUserAssigned
        ? 'You have successfully cancelled your participation'
        : 'You have successfully signed up for the event',
    });
    setButtonDisabled(false);
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">Tags</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground">{event.description}</p>

            <div>
              <h2 className="text-sm font-medium text-foreground">Details</h2>

              <div className="flex flex-col gap-2 py-1">
                <p className="flex gap-2 text-muted-foreground">
                  <Clock /> {format(new Date(event.startDate), 'HH:mm')} -{' '}
                  {format(new Date(event.endDate), 'HH:mm')}
                </p>
                <p className="flex gap-2 text-muted-foreground">
                  <Calendar /> {format(new Date(event.startDate), 'dd.MM.yyyy')}
                </p>
                <p className="flex gap-2 text-muted-foreground">
                  <MapPin /> {event.city} ({event.latitude}, {event.longitude})
                </p>
              </div>
            </div>

            <Button className="w-full" onClick={handleSignUp} disabled={buttonDisabled}>
              {isCurrentUserAssigned ? 'Cancel' : 'Sign Up'}
            </Button>
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-medium text-foreground">Participants</h2>
            <p className="text-muted-foreground">
              Min {event.minCapacity}, max {event.maxCapacity}
            </p>
            <p className="text-muted-foreground">
              {event.participants.length} signed up
              {participantsRequired > 0 ? `, ${participantsRequired} more needed` : ''}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {event.participants.map((participant) => (
                <Badge key={participant.id} className="text-sm">
                  {participant.fullname || 'Anonymous'}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
