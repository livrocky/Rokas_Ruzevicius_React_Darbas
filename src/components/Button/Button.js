import css from '../Button/Button.module.css';

function Button() {
  return (
    <div>
      <button className={css.registerBtn} type='submit'>
        Register
      </button>
    </div>
  );
}

export default Button;
