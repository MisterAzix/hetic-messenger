import {RegisterForm} from "../../src/components/RegisterForm";
import css from './Register.module.scss';

export default function Register() {
  return (
    <>
      <h1 className={css.title}>Let's join us right now!</h1>
      <RegisterForm />
    </>
  );
}
