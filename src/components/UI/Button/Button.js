function Button({ onClick, classes, disabled, textContent }) {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      onClick={clickHandler}
      className={`${classes} is-clickable`}
      disabled={disabled}
      type="button"
    >
      {textContent}
    </button>
  );
}

export default Button;
