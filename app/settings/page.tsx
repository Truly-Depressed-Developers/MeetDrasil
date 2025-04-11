import { PageLayout, PageTitle } from '@/components/layout/PageLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import TestSettings from '@/components/settings/TestSettings';
import AccountSettings from '@/components/settings/AccountSettings';

export default function Settings() {
  return (
    <PageLayout>
      <PageTitle>Settings</PageTitle>
      <GeneralSettings />
      <AccountSettings />
      <TestSettings />
    </PageLayout>
  );
}
