import './Button.module.css';

function Button({ onClick, classes, disabled, textContent }) {
  const clickHandler = () => {
    onClick();
  };
  return (
    <button
      onClick={clickHandler}
      className={classes}
      disabled={disabled}
      type="button"
    >
      {textContent}
    </button>
  );
}

export default Button;
