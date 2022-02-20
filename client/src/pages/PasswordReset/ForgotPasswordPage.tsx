// Custom components
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useForgotPassword } from '../../hooks/auth';

export const ForgotPasswordPage = () => {
  const { mutate: forgotPassword, isLoading } = useForgotPassword();

  return (
    <AuthTemplate title="Prośba o zresetowanie hasła">
      {isLoading && <Loader />}
      <ForgotPasswordForm onSubmit={forgotPassword} />
    </AuthTemplate>
  );
};
