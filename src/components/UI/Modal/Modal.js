import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Modal.module.css';

function DialogBox({ open, setModal, editValue, currentValue, title }) {
  const [inputValue, setInputValue] = useState(currentValue);

  const handleClose = () => {
    open = false;
    setModal(false);
  };
  const changeHandler = (value) => {
    setInputValue(value.target.value);
  };
  const handleUpdate = () => {
    editValue(inputValue);
    setModal(false);
  };

  return (
    <>
      {open && (
        <div className="modal is-active" data-testid="modal">
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <Button
                classes="delete button is-danger"
                onClick={() => handleClose(false)}
              />
            </header>
            <section className="modal-card-body">
              <input
                id="todoTextModal"
                className="input is-small p-4"
                placeholder="Update Value"
                onChange={changeHandler}
                value={inputValue}
              />
            </section>
            <footer className={`${styles['modal-card-footer']}`}>
              <Button
                textContent="Update"
                classes="button is-primary is-pulled-right"
                onClick={handleUpdate}
                disabled={!inputValue?.length}
              />
            </footer>
          </div>
        </div>
      )}
      <div />
    </>
  );
}
export default DialogBox;
