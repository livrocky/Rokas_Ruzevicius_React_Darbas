import css from '../Button/Button.module.css';

function Button() {
  return (
    <div>
      <button className={css.registerBtn} type='submit'></button>
    </div>
  );
}

export default Button;
