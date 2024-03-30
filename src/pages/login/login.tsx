import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/auth/actions';
import { selectErrorText } from '../../services/auth/slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dipatch = useDispatch();

  const errorMessage = useSelector(selectErrorText);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dipatch(login({ email: email, password: password }));
  };

  return (
    <LoginUI
      errorText={errorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
