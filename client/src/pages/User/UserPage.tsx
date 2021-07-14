import { useParams } from 'react-router-dom';
// Custom components
import { UserDetails } from './UserDetails';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useUser } from '../../hooks/users';

type ParamTypes = {
  id: string;
};

export const UserPage = () => {
  const { id } = useParams<ParamTypes>();

  const { data: user, isLoading } = useUser(id);

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <PageHeading title="Profil użytkownika" />
      {user ? <UserDetails user={user} /> : null}
    </MainTemplate>
  );
};
