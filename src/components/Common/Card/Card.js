import styles from './Card.module.css';

function Card({ data, setValue }) {
  // to set selected element in parent component
  const valueHandler = (event) => {
    setValue(event.target.textContent);
  };

  return (
    <div className={styles.viewgrid}>
      {data.map((dataValue) => (
        <div
          role="presentation"
          onClick={valueHandler}
          className={styles.element}
          key={Math.random()}
          type="button"
        >
          {dataValue}
        </div>
      ))}
    </div>
  );
}

Card.defaultProps = { data: [] };
export default Card;
