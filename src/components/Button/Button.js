import "./Button.module.css";

const Button = ({ onClick, classes, disabled, textContent }) => {
  const clickHandler = () => {
    onClick();
  };
  return (
    <button onClick={clickHandler} className={classes} disabled={disabled}>
      {textContent}
    </button>
  );
};

export default Button;
