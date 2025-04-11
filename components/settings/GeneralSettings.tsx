import { ThemeToggleButton } from '@/components/settings/ChangeThemeButton';
import { PageSectionTitle } from '@/components/layout/PageLayout';

export default function GeneralSettings() {
  return (
    <>
      <PageSectionTitle>General</PageSectionTitle>
      <div className="flex flex-col gap-4">
        <ThemeToggleButton />
      </div>
    </>
  );
}
