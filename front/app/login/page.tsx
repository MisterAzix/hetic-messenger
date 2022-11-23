import { LoginForm } from '../../src/components/LoginForm';
import css from './Login.module.scss';

export default function Login() {
  return (
    <>
      <h1 className={css.title}>Please Login</h1>
      <LoginForm />
    </>
  );
}
