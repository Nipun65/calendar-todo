import styles from "./Card.module.css";
import { handleFunc } from "../Handlers/Handlers";

const Card = ({ data, setValue }) => {
  return (
    <div className={styles["viewgrid"]}>
      {data.map((dataValue) => (
        <div
          onClick={(event) => handleFunc(setValue, event.target.textContent)}
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
