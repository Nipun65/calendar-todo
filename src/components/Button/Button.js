import "./Button.module.css";

const Button = (props) => {
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <button
      onClick={clickHandler}
      className={props.classes}
      style={props.style}
      disabled={props.disabled}
    >
      {props.textContent}
    </button>
  );
};

export default Button;
