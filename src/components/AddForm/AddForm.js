import css from './AddForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
// import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Button from '../UI/Button/Button';

const initValues = {
  title: '',
  description: '',
};
function AddForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().max(10).min(2).required(),
      desc: Yup.string().min(4, 'At least 4 symbols are required').max(50).required(),
    }),
    onSubmit: async (values) => {
      console.log('values ===', values);

      const fetchResult = await myFetch(`${baseUrl}/v1/content/skills`, 'POST', values);
      // ar gavom token
      if (fetchResult.msg === 'Added new skill to account') {
        // turim token

        ctx.add(fetchResult.token, values.email);
        // redirect to /posts
        history.replace('/');
      }
      console.log('fetchResult ===', fetchResult);
    },
  });

  return (
    <form className={css['add-container']} onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Enter Your Title:</label>
      <div className={css['input-group']}>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={formik.touched.title && formik.errors.title ? css['error-input'] : ''}
          name='title'
          type='text'
          placeholder='Enter Your title'
          id='title'
        ></input>
        {formik.touched.title && formik.errors.title && (
          <p className={css.errorMsg}>{formik.errors.title}</p>
        )}
      </div>
      <div className={css['input-group']}>
        <label htmlFor='desc'>Enter Your Description:</label>
        <textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.desc}
          className={formik.touched.desc && formik.errors.desc ? css['error-input'] : ''}
          name='desc'
          type='text'
          placeholder='Your Description'
          // rows='4'
          // cols='62.9'
          id='desc'
        ></textarea>
        {formik.touched.desc && formik.errors.desc && (
          <p className={css.errorMsg}>{formik.errors.desc}</p>
        )}
      </div>

      <Button submit>Add</Button>
    </form>
  );
}

export default AddForm;
