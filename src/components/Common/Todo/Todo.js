import { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import Checkbox from '../../UI/Checkbox/Chekbox';
import DialogBox from '../../UI/Modal/Modal';
import styles from './Todo.module.css';

function Todo({ date, Month }) {
  let gettodos = JSON.parse(window.localStorage.getItem('todos'));
  if (!gettodos) {
    gettodos = {};
  }
  const [todoObj, setTodoObj] = useState(gettodos);
  const [touched, setTouched] = useState(false);
  const [isValid, setValid] = useState(true);
  const [openModal, setModal] = useState(false);
  const [indexToEdit, setIndex] = useState(0);

  const todayDate = `${date.selectedDate.userDate}-${
    Month[date.selectedDate.userMonth]
  }-${date.selectedDate.userYear}`;

  useEffect(() => {
    setValid(true);
  }, [date]);

  const handleChange = () => {
    if (document.getElementById('todoText').value.length) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const tempObj = todoObj;
  const addTodo = () => {
    setTouched(true);
    if (document.getElementById('todoText').value.length === 0) {
      setValid(false);
    } else {
      if (tempObj[todayDate] === undefined) {
        tempObj[todayDate] = [];
      }
      tempObj[todayDate].push({
        task: document.getElementById('todoText').value,
        isCompleted: false,
      });
      document.getElementById('todoText').value = '';
      window.localStorage.setItem('todos', JSON.stringify(tempObj));
      setTodoObj({ ...tempObj });
      setValid(true);
    }
  };

  const handleDelete = (index) => {
    todoObj[todayDate].splice(index, 1);
    window.localStorage.setItem('todos', JSON.stringify(tempObj));
    setTodoObj({ ...todoObj });
  };

  const handleComplete = (index) => {
    todoObj[todayDate][index].isCompleted =
      !todoObj[todayDate][index].isCompleted;
    window.localStorage.setItem('todos', JSON.stringify(tempObj));
    setTodoObj({ ...todoObj });
  };

  const handleUpdate = (index) => {
    setModal(true);
    setIndex(index);
  };

  const handleEditedValue = (value) => {
    todoObj[todayDate][indexToEdit].task = value;
    window.localStorage.setItem('todos', JSON.stringify(tempObj));
    setTodoObj({ ...todoObj });
  };

  return (
    <>
      <div className="has-text-centered pt-4 is-size-4-mobile is-size-3-tablet is-size-2-desktop has-text-weight-bold">
        To-do List
      </div>
      <div className="has-text-centered p-6">
        <div className={`control is-centered container ${styles.inputdiv}`}>
          <input
            id="todoText"
            className="input"
            type="text"
            placeholder="Enter Todo"
            onFocus={() => {
              setTouched(false);
            }}
            onChange={handleChange}
          />
          {!isValid && touched && (
            <p className="help is-danger has-text-weight-bold is-pulled-left px-1">
              This field is required
            </p>
          )}
        </div>

        <div className="pt-6">
          <Button
            classes={`button is-success ${styles.addtodobtn}`}
            onClick={addTodo}
            textContent="Add Todo"
          />
        </div>
      </div>
      <div className={styles['main-div']}>
        {todoObj[todayDate] &&
          todoObj[todayDate].map((dataValue, index) => (
            <div
              key={Math.random()}
              className={`p-4 m-2 ${styles['todo-div']}`}
            >
              <Checkbox
                onClick={() => handleComplete(index)}
                classes="is-inline"
                checked={dataValue.isCompleted}
              />

              <li
                className={`pl-3 ${styles.todocontent} ${styles.liele}`}
                style={
                  dataValue.isCompleted
                    ? { textDecoration: 'line-through' }
                    : {}
                }
              >
                {dataValue.task}
              </li>

              <div className="is-pulled-right">
                <Button
                  onClick={() => handleUpdate(index)}
                  classes={`fas fa-edit ${styles.editbutton}`}
                />

                <Button
                  onClick={() => handleDelete(index)}
                  classes="delete button is-danger"
                />
              </div>
            </div>
          ))}
      </div>
      {openModal && (
        <DialogBox
          open={openModal}
          setModal={setModal}
          editValue={handleEditedValue}
          currentValue={todoObj[todayDate][indexToEdit].task}
          title="Update Todo"
        />
      )}

      {(!todoObj[todayDate] || !todoObj[todayDate].length) && (
        <div className="has-text-centered subtitle is-4  has-text-weight-bold">
          No Todos Yet
        </div>
      )}
    </>
  );
}

export default Todo;
