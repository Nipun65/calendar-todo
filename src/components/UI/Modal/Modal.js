import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
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
    <Modal
      open={open}
      onClose={handleClose}
      center
      classNames={{
        modal: styles.Modal,
      }}
    >
      <h1 className="py-4 px-1 has-text-weight-bold">{title}</h1>
      <input
        id="todoTextModal"
        className="input is-small p-4"
        placeholder="Update Value"
        onChange={changeHandler}
        value={inputValue}
      />
      <Button
        textContent="Update"
        classes="is-primary button m-2 is-pulled-right"
        onClick={handleUpdate}
        disabled={!inputValue.length}
      />
    </Modal>
  );
}
export default DialogBox;
