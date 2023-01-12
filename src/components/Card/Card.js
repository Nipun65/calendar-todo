import styles from "./Card.module.css";

const Card = (props) => {
  const valueHandler = (event) => {
    props.setValue(event.target.textContent);
  };
  return (
    <div className={styles["viewgrid"]}>
      {props.data.map((data) => (
        <div
          onClick={valueHandler}
          className={styles["element"]}
          key={Math.random()}
        >
          {data}
        </div>
      ))}
    </div>
  );
};
export default Card;
