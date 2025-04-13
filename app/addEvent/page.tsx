import { PageLayout, PageTitle } from '@/components/layout/PageLayout';
import EventForm from '@/components/eventForm/eventForm';

export default function AddEventPage() {
  return (
    <PageLayout>
      <PageTitle>Add event</PageTitle>
      <div className="mx-auto max-w-3xl">
        <EventForm />
      </div>
    </PageLayout>
  );
}
