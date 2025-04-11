import { PageSectionTitle } from '@/components/layout/PageLayout';
import ToastButton from '@/components/settings/ToastButton';

export default function TestSettings() {
  return (
    <>
      <PageSectionTitle>Testy</PageSectionTitle>
      <div className="flex flex-col gap-4">
        <span className="text-center text-sm text-muted-foreground">
          Tymczasowe funkcje przydatne podczas testów
        </span>
        <ToastButton />
      </div>
    </>
  );
}
