import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Custom components
import { AuthTemplate } from '../../templates/AuthTemplate';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

type ParamTypes = {
  confirmationCode: string;
};

export const WelcomePage = () => {
  const { confirmAccount } = useAuthState();

  const { confirmationCode } = useParams<ParamTypes>();

  useEffect(() => {
    confirmAccount(confirmationCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthTemplate title="Witaj">
      <p>Potwierdzenie rejestracji</p>
      <Link to="/login">Zaloguj się</Link>
    </AuthTemplate>
  );
};
