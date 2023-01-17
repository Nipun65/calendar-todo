import styles from "./Card.module.css";

const Card = ({ data, setValue }) => {
  const valueHandler = (event) => {
    setValue(event.target.textContent);
  };
  return (
    <div className={styles["viewgrid"]}>
      {data.map((dataValue) => (
        <div
          onClick={valueHandler}
          className={styles["element"]}
          key={Math.random()}
        >
          {dataValue}
        </div>
      ))}
    </div>
  );
};
export default Card;
