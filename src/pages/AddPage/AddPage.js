import AddForm from '../../components/AddForm/AddForm';
import css from '../AddPage/AddPage.module.css';

function AddPage() {
  return (
    <div className={css['container']}>
      <h1 className={css.title}>Add Skills</h1>
      <AddForm />
    </div>
  );
}

export default AddPage;
