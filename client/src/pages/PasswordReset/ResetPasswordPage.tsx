// Custom components
import { useParams } from 'react-router-dom';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useResetPassword } from '../../hooks/auth';
import { ResetPasswordForm } from './ResetPasswordForm';

type ParamTypes = {
  token: string;
};

export const ResetPasswordPage = () => {
  const { token } = useParams<ParamTypes>();
  const { mutate: resetPassword, isLoading } = useResetPassword(token);

  return (
    <AuthTemplate title="Podaj nowe hasło">
      {isLoading && <Loader />}
      <ResetPasswordForm onSubmit={resetPassword} />
    </AuthTemplate>
  );
};
