import { PageLayout, PageSectionTitle, PageTitle } from '@/components/layout/PageLayout';
import ExampleServerComponent from '@/components/example/ExampleServerComponent';

export default function Home() {
  return (
    <PageLayout>
      <PageTitle>Home</PageTitle>
      <PageSectionTitle>Example server component</PageSectionTitle>
      <ExampleServerComponent />
    </PageLayout>
  );
}
