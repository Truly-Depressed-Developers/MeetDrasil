import EventList from '@/components/events/EventList';
import Map from '@/components/map/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trpc } from '@/trpc/server';
import { format } from 'date-fns';

const EventPage = async () => {
  const eventData = await trpc.event.getAll();
  const userHobbies = await trpc.hobby.getSelected();
  const userData = await trpc.user.getCurrent();

  const markers = eventData.map((event) => ({
    long: event.longitude,
    lat: event.latitude,
    content: {
      name: event.name,
      date: format(new Date(event.startDate), 'MMM d, yyyy'),
    },
    eventId: event.id,
  }));

  return (
    <div className="flex size-full max-h-screen flex-col justify-around overflow-hidden md:flex-row">
      <div className="size-full rounded-md p-4 md:w-1/2">
        <div className="size-full overflow-hidden rounded-md">
          <Map long={19.94} lat={50.05} markers={markers} />
        </div>
      </div>
      <div className="max-h-screen w-full overflow-scroll overflow-x-hidden p-6 md:w-1/2">
        <div className="w-full">
          <Tabs defaultValue="events">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="myEvents">My events</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
            </TabsList>
            <TabsContent value="myEvents">
              <EventList
                events={eventData.filter(
                  (event) =>
                    event.participants.some((p) => p.id == userData?.id) ||
                    event.ownerId == userData?.id
                )}
              />
            </TabsContent>
            <TabsContent value="events">
              <EventList
                events={eventData.filter(
                  (event) =>
                    userHobbies.some((hobby) => event.tags.some((tag) => tag.id == hobby.id)) &&
                    event.ownerId != userData?.id &&
                    !event.participants.some((p) => p.id == userData?.id)
                )}
              />
            </TabsContent>
            <TabsContent value="explore">
              <EventList
                events={eventData.filter(
                  (event) =>
                    event.ownerId != userData?.id &&
                    !event.participants.some((p) => p.id == userData?.id)
                )}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
