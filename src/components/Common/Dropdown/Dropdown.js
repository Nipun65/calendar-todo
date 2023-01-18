import { useState } from 'react';
import styles from './Dropdown.module.css';
import Button from '../../UI/Button/Button';

function Dropdown({ option, setValue }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Month');

  // handling selected option
  const handleOptionClick = (value) => {
    setShowMenu(!showMenu);
    setSelectedOption(value.target.textContent);
    setValue(value.target.textContent);
  };

  return (
    <div className={styles.dropdown}>
      <Button
        onClick={() => setShowMenu(!showMenu)}
        classes={styles.titlebutton}
        textContent={selectedOption}
      />

      {showMenu ? (
        <ul className={styles['dropdown-menu']}>
          {option.map((value) => (
            <li
              role="presentation"
              onClick={handleOptionClick}
              key={Math.random()}
            >
              {value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
export default Dropdown;
