import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from '../RegisterPage/Register.module.css';

function RegisterPage() {
  return (
    <div>
      <h1 className={css.title}>Register Form</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
