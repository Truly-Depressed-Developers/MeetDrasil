import { PageLayout } from '@/components/layout/PageLayout';
import Event from '@/components/events/Event';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageLayout>
      <Event id={id} />
    </PageLayout>
  );
}
