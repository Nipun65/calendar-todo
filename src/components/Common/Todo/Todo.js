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
      <div className="has-text-centered p-3 is-size-2 has-text-weight-bold">
        To-do List
      </div>
      <div className="has-text-centered p-6">
        <div className="control">
          <input
            id="todoText"
            className="input is-normal container is-centered"
            type="text"
            placeholder="Enter Todo"
            onFocus={() => {
              setTouched(false);
            }}
            onChange={handleChange}
          />
        </div>

        {!isValid && touched && (
          <p
            className={`help is-danger has-text-weight-bold ${styles.required} mb-3 px-1`}
          >
            This field is required
          </p>
        )}
        <div className="pt-6">
          <Button
            classes="button is-success is-medium"
            onClick={addTodo}
            textContent="Add Todo"
          />
        </div>
      </div>
      {todoObj[todayDate] &&
        todoObj[todayDate].map((dataValue, index) => (
          <div
            key={Math.random()}
            className={`p-3 is-multiline px-6 ${styles['background-color']}`}
          >
            <Checkbox
              onClick={() => handleComplete(index)}
              classes="is-inline"
              checked={dataValue.isCompleted}
            />
            <li
              className="is-inline p-3"
              style={
                dataValue.isCompleted ? { textDecoration: 'line-through' } : {}
              }
            >
              {dataValue.task}
            </li>

            <Button
              onClick={() => handleUpdate(index)}
              classes={`button is-primary is-pulled-right ml-4 ${styles.editbutton}`}
              textContent="Edit"
            />
            <Button
              onClick={() => handleDelete(index)}
              classes="delete is-pulled-right button is-danger"
            />
          </div>
        ))}

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