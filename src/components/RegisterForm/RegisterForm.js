import css from '../RegisterForm/Register.module.css';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/Button/Button';
import toast from 'react-hot-toast';

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
      password: Yup.string().min(4, 'At least 4 symbols').max(20).required(),
      repeatPassword: Yup.string()
        .required('repeat password is a required field')
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      // console.log('values ===', values);
      // console.log('valuesCopy ===', valuesCopy);
      const registerResult = await myFetch(`${baseUrl}/v1/auth/register`, 'POST', valuesCopy);
      if (registerResult.changes === 1) {
        toast.success('Registered Successfully!');
        ctx.login(registerResult.token, valuesCopy.email);
        history.replace('/login');
      }
      // console.log('registerResult ===', registerResult);
      if (registerResult.changes !== 1) {
        toast.error('Registration failed!');
      }

      // console.log('submiting values ===', values);
    },
  });

  function matchPass() {
    const { password, repeatPassword } = initValues;
    if (password !== repeatPassword) {
      // console.log('Passwords does not match');
    }
  }

  return (
    <form className={css['register-container']} onSubmit={formik.handleSubmit} onBlur={matchPass}>
      <label htmlFor='email'>Enter your Email:</label>
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
      <label htmlFor='repeatPassword'>Repeat Your Password:</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.repeatPassword}
        className={
          formik.touched.repeatPassword && formik.errors.repeatPassword ? css['error-input'] : ''
        }
        name='repeatPassword'
        type='password'
        placeholder='Repeat Password'
        id='repeatPassword'
      />
      {formik.touched.repeatPassword && formik.errors.repeatPassword && (
        <p className={css.errorMsg}>{formik.errors.repeatPassword}</p>
      )}

      <Button submit>Register</Button>
    </form>
  );
}

export default RegisterForm;
