import styles from './Card.module.css';

function Card({ data, setValue }) {
  // to set selected element in parent component
  const valueHandler = (event) => {
    setValue(event.target.textContent);
  };

  return (
    <div className={styles.viewgrid} data-testid="card">
      {data.map((dataValue) => (
        <div
          role="presentation"
          onClick={valueHandler}
          className={`${styles.element} is-clickable is-flex`}
          key={Math.random()}
          type="button"
        >
          {dataValue}
        </div>
      ))}
    </div>
  );
}

export default Card;
