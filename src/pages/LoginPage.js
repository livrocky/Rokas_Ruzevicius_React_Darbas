import LoginForm from '../components/LoginForm/LoginForm';
import css from '../components/RegisterForm/Register.module.css';

function LoginPage() {
  return (
    <div>
      <h1 className={css.title}>Login Page</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
