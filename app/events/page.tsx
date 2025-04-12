import BadgeWithImage from '@/components/hobbyBadge/HobbyBadge';
import Map from '@/components/map/Map';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/trpc/server';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

const EventPage = async () => {
  const eventData = await trpc.event.getAll();

  const markers = eventData.map((event) => ({
    long: event.longitude,
    lat: event.latitude,
  }));

  return (
    <div className="flex size-full max-h-screen flex-col justify-around gap-4 overflow-hidden md:flex-row">
      <div className="size-full rounded-md p-4 md:w-1/2">
        <div className="size-full overflow-hidden rounded-md">
          <Map long={19.94} lat={50.05} markers={markers} />
        </div>
      </div>
      <div className="max-h-screen w-full space-y-4 overflow-scroll p-4 md:w-1/2">
        <div className="space-y-3">
          {eventData.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden transition-all duration-100 hover:scale-105"
            >
              <div className="flex flex-col sm:h-40 sm:flex-row md:h-44">
                <div className="h-36 sm:h-full sm:w-1/3">
                  <Image
                    src={'https://placehold.co/144x144'}
                    width={144}
                    height={144}
                    alt={event.name}
                    className="size-full object-cover"
                  />
                </div>

                <CardContent className="flex flex-1 flex-col p-4 sm:overflow-hidden">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="truncate text-lg font-semibold">{event.name}</h3>
                    <span className="ml-2 whitespace-nowrap text-sm font-medium">
                      ~${(event.price / event.maxCapacity).toFixed(2)}
                    </span>
                  </div>

                  <div className="mb-2 flex flex-wrap gap-2">
                    {event.tags.slice(0, 2).map((tag) => (
                      <BadgeWithImage
                        className="px-2 py-1 text-sm"
                        imageUrl={tag.image_url}
                        name={tag.name}
                        isActive={false}
                        iconSize={16}
                        key={tag.id}
                      />
                    ))}
                    {event.tags.length > 2 && (
                      <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                        +{event.tags.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-3.5 shrink-0" />
                      <span className="truncate">
                        {format(new Date(event.startDate), 'MMM d, yyyy')}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Users className="mr-1 size-3.5 shrink-0" />
                      <span className="truncate">
                        {event.participants.length}/{event.maxCapacity}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="mr-1 size-3.5 shrink-0" />
                      <span className="truncate">{event.city}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
