import css from './AddForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetchAuth } from '../../utils';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Button from '../UI/Button/Button';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const initValues = {
  title: '',
  description: '',
};
function AddForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().max(25).min(2).required(),
      description: Yup.string().min(4, 'At least 4 symbols are required').max(50).required(),
    }),
    onSubmit: async (values) => {
      const addFetch = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'POST', token, values);
      if (addFetch.msg === 'Added new skill to account') {
        if (addFetch.msg === 'Added new skill to account') {
          toast.success('New skill has been added!');
          history.replace('/home');
        }
        if (addFetch.err === 'Incorrect data sent') {
          toast.error('Error while adding skill. Please try again.');
          return;
        }
      }
    },
  });

  useEffect(() => {
    if (token) myFetchAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <label htmlFor='description'>Enter Your Description:</label>
        <textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className={
            formik.touched.description && formik.errors.description ? css['error-input'] : ''
          }
          name='description'
          type='text'
          placeholder='Your Description'
          id='description'
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className={css.errorMsg}>{formik.errors.description}</p>
        )}
      </div>
      <div className={css['add-btn']}>
        <Button submit>Add</Button>
      </div>
    </form>
  );
}

export default AddForm;
