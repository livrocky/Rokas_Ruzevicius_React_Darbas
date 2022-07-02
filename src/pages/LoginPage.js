import LoginForm from '../components/LoginForm/LoginForm';
import css from '../App.css';

function LoginPage() {
  return (
    <div>
      <h1 className={css.title}>Login Page</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
