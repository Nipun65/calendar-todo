import { handleFunc } from "../Handlers/Handlers";
import "./Button.module.css";

const Button = ({ onClick, classes, disabled, textContent }) => {
  return (
    <button
      onClick={() => handleFunc(onClick)}
      className={classes}
      disabled={disabled}
    >
      {textContent}
    </button>
  );
};

export default Button;
