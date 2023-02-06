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
    <div data-testid="dropdown">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        classes="button is-primary"
        textContent={
          <div className={`${styles.textContent}`}>
            <span>{selectedOption}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </div>
        }
      />

      {showMenu ? (
        <ul className={styles['dropdown-menu']}>
          {option.map((value) => (
            <li
              role="presentation"
              onClick={handleOptionClick}
              key={Math.random()}
              className={`has-text-centered ${styles.dropdownli} is-clickable`}
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
