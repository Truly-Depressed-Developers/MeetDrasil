import { trpc } from '@/trpc/server';

export default async function ExampleServerComponent() {
  const exampleData = await trpc.example.getExampleDataWithInput('server component');
  const userData = await trpc.example.getExampleUserData();
  const eventData = await trpc.event.getAll();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3>Example server component</h3>
        <span>{exampleData}</span>
      </div>
      <div>
        <h3>User data</h3>
        <span>{userData.isAnonymous ? 'Anonymous user authenticated' : userData.email}</span>
      </div>
      {eventData.map((e) => (
        <div key={e.id} className="flex flex-col gap-2">
          <h3>{e.name}</h3>
          <span>{e.description}</span>
          <span>{e.startDate.toString()}</span>
          <div className="flex flex-col gap-2">
            Tags:
            {e.tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            Participants:
            {e.participants.map((participant) => (
              <span key={participant.id}>{participant.fullname}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
