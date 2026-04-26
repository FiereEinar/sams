import Layout from './Layout';
import ProfileForm from '@/components/ProfileForm';
import { usePage } from '@inertiajs/react';

export default function Profile() {
  const { props } = usePage();
  const { user } = props as any;

  return (
    <Layout>
      <ProfileForm user={user} profileAction="/admin/profile" passwordAction="/admin/profile/password" />
    </Layout>
  );
}
