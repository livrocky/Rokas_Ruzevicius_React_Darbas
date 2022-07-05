import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
// import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Button from '../UI/Button/Button';
import toast from 'react-hot-toast';

const initValues = {
  email: 'rokas@rokas.lt',
  password: 'labaslabas',
};
function LoginForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your Email').required(),
      password: Yup.string().min(4, 'At least 4 symbols are required').max(20).required(),
    }),
    onSubmit: async (values) => {
      console.log('values ===', values);

      const fetchResult = await myFetch(`${baseUrl}/v1/auth/login`, 'POST', values);
      if (fetchResult.msg === 'Successfully logged in') {
        toast.success('Logged in Successfully!');
        ctx.login(fetchResult.token, values.email);
        history.replace('/');
      }
      if (!fetchResult.token) {
        toast.error('Your Email or Password is Incorrect!');
        return;
        // redirect to /posts
      }
      console.log('fetchResult ===', fetchResult);
    },
  });

  return (
    <form className={css['login-container']} onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Enter Your Email:</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={formik.touched.email && formik.errors.email ? css['error-input'] : ''}
        name='email'
        type='text'
        placeholder='Your Email'
        id='email'
      />
      {formik.touched.email && formik.errors.email && (
        <p className={css.errorMsg}>{formik.errors.email}</p>
      )}
      <label htmlFor='password'>Enter Your Password:</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className={formik.touched.password && formik.errors.password ? css['error-input'] : ''}
        name='password'
        type='password'
        placeholder='Your Password'
        id='password'
      />
      {formik.touched.password && formik.errors.password && (
        <p className={css.errorMsg}>{formik.errors.password}</p>
      )}
      <p className={css['reg-link-text']}>
        Don't have an account yet?
        <a href='/register' className={css['reg-link']}>
          Register here!
        </a>
      </p>
      <Button submit>Login</Button>
    </form>
  );
}

export default LoginForm;
