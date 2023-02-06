function Checkbox({ onClick, classes, checked }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onClick={handleClick}
      className={`${classes} is-clickable`}
      readOnly
    />
  );
}
export default Checkbox;
