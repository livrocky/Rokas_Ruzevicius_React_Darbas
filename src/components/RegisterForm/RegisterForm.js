import css from '../RegisterForm/Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
// import { useContext } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};
function RegisterForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Patikrinkite savo email').required(),
      password: Yup.string().min(4, 'Maziausiai 4 simboliai').max(20).required(),
      repeatPassword: Yup.string().min(4, 'Maziausiai 4 simboliai').max(20).required(),
    }),
    onSubmit: async (values) => {
      const valueCopy = { ...values };
      delete valueCopy['repeatPassword'];
      console.log('values ===', values);
      console.log('valueCopy===', valueCopy);
      const fetchResult = await myFetch(`${baseUrl}/register`, 'POST', valueCopy);
      // ar gavom token
      if (fetchResult.success) {
        // turim token
        ctx.register(fetchResult.token, values.email);
        // redirect to /login
        history.replace('/login');
      }
      console.log('fetchResult ===', fetchResult);
    },
  });

  //   console.log('formik.touched ===', formik.touched);
  //   console.log('formik.values ===', formik.values);

  return (
    <form className={css.container} onSubmit={formik.handleSubmit}>
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

      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.repeatPassword}
        className={
          formik.touched.repeatPassword && formik.errors.repeatPassword ? css.errorInput : ''
        }
        name='repeatPassword'
        type='password'
        placeholder='Repeat your password'
      />
      {formik.touched.repeatPassword && formik.errors.repeatPassword && (
        <p className={css.errorMsg}>{formik.errors.repeatPassword}</p>
      )}

      <Button />
    </form>
  );
}

export default RegisterForm;
