'use client';

import { trpc } from '@/trpc/client';

export default function ExampleClientComponent() {
  const exampleData = trpc.example.getExampleDataWithInput.useQuery('client component');

  return (
    <div>
      <h3>Example client component</h3>
      <span>{exampleData.data}</span>
    </div>
  );
}
