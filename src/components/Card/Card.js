import css from '../Card/Card.module.css';

function Card(props) {
  return (
    <div className={css['cards-display']}>
      <div className={css.card}>
        <h3 className={css['card-title']}>{props.title}</h3>
        <p className={css['card-description']}>{props.description}</p>
      </div>
    </div>
  );
}

export default Card;
