import styles from "./Card.module.css";

const Card = (props) => {
  const ValueHandler = (event) => {
    props.setValue(event.target.textContent);
  };
  return (
    <div className={styles["viewgrid"]}>
      {props.data.map((data) => (
        <div
          onClick={ValueHandler}
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
