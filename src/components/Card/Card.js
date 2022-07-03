import css from '../Card/Card.module.css';

function Card() {
  return (
    <div className={css.card}>
      <h3 className={css['card-title']}>The best title ever</h3>
      <p className={css['card-desc']}>Some sort of description that should come from the server</p>
    </div>
  );
}

export default Card;
