import { RegisterForm } from './RegisterForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

export const RegisterPage = () => {
  const { loading, register } = useAuthState();

  return (
    <AuthTemplate title="Rejestracja">
      {loading && <Loader />}
      <RegisterForm onSubmit={register} />
    </AuthTemplate>
  );
};
