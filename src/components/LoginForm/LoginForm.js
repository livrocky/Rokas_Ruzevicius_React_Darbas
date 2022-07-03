import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
// import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Button from '../Button/Button';

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

      const fetchResult = await myFetch(`${baseUrl}/login`, 'POST', values);
      // ar gavom token
      if (fetchResult.msg === 'Successfully logged in') {
        // turim token

        ctx.login(fetchResult.token, values.email);
        // redirect to /posts
        history.replace('/');
      }
      console.log('fetchResult ===', fetchResult);
    },
  });

  //   console.log('formik.touched ===', formik.touched);
  // console.log('formik.values ===', formik.values);

  return (
    <form className={css['login-container']} onSubmit={formik.handleSubmit}>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={formik.touched.email && formik.errors.email ? css.errorInput : ''}
        name='email'
        type='text'
        placeholder='Your email'
      />
      {formik.touched.email && formik.errors.email && (
        <p className={css.errorMsg}>{formik.errors.email}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className={formik.touched.password && formik.errors.password ? css.errorInput : ''}
        name='password'
        type='password'
        placeholder='Your password'
      />
      {formik.touched.password && formik.errors.password && (
        <p className={css.errorMsg}>{formik.errors.password}</p>
      )}
      <Button submit>Login</Button>
    </form>
  );
}

export default LoginForm;
