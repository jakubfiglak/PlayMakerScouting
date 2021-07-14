import { PageHeading } from '../../components/PageHeading';
import { GrantAccessForm } from './GrantAccessForm';

export const AccessManagementTab = () => {
  return (
    <>
      <PageHeading title="Zarządzanie dostępami" />
      <GrantAccessForm />
    </>
  );
};
