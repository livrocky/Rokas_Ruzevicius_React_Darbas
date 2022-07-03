import css from '../Button/Button.module.css';

function Button(props) {
  return (
    <div>
      <button type={props.submit ? 'submit' : 'button'} className={css.registerBtn}>
        {props.children}
      </button>
    </div>
  );
}

export default Button;
