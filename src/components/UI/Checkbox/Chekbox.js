import styles from './Checkbox.module.css';

function Checkbox({ onClick, classes, checked }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onClick={handleClick}
      className={`${classes} ${styles.checkbox}`}
      readOnly
    />
  );
}
export default Checkbox;
