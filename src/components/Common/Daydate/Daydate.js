import styles from './Daydate.module.css';
import { DAYS } from '../../../utils/Constants.utils';

function Daydate({ date, setValue, selectedOption, MONTHS, setView }) {
  const startYear = date.year;
  const startMonth = date.month;
  const daywisedates = Array(6)
    .fill()
    .map(() => Array(7).fill(0));

  // filling the array according to startday and end date
  const fillTheArray = (i, startDay, end) => {
    let dateValue = 1;
    let week = 0;
    while (dateValue <= end) {
      daywisedates[week][startDay % 7] = dateValue;
      startDay++;
      dateValue++;
      if (startDay % 7 === 0) {
        week++;
      }
    }
  };

  const startDate = new Date(startYear, startMonth, 1);
  const endDate = new Date(startYear, startMonth + 1, 0);
  const endDateOfTheMonth = endDate.getDate();
  const startDayOfTheMonth = startDate.getDay();
  fillTheArray(startMonth, startDayOfTheMonth, endDateOfTheMonth);

  const dateHandler = (event) => {
    date.selectedDate = {
      userYear: date.year,
      userMonth: date.month,
      userDate: +event.target.textContent,
    };
    setValue(date);
    setView('day');
  };

  // style for setting today's date and user selected date
  const getStyle = (dateValue) => {
    if (
      date.month === date.currentMonth &&
      date.date === dateValue &&
      date.currentYear === +date.year
    ) {
      return { backgroundColor: '#95638e4d' };
    }
    return {};
  };

  return (
    <div
      className={`${styles['main-div']} ${
        selectedOption === 'Year' ? styles['grid-item'] : ''
      }`}
      data-testid="daydate"
    >
      {selectedOption === 'Year' && (
        <div className={styles.month}>{MONTHS[date.month]}</div>
      )}
      <div className={styles.days}>
        {DAYS.map((value) => (
          <div key={Math.random()} className={`${styles['days-ele']}`}>
            {value}
          </div>
        ))}
      </div>
      <div>
        {daywisedates.map((value) => (
          <div
            key={Math.random()}
            className={`${
              selectedOption === 'Year' ? styles['array-year'] : styles.array
            }`}
          >
            {value.map((dateValue) => {
              if (dateValue) {
                return (
                  <div
                    className={`${styles['parent-element']}`}
                    key={Math.random()}
                  >
                    <div
                      role="presentation"
                      className={`${
                        selectedOption === 'Year'
                          ? styles['array-element-year']
                          : styles['array-element']
                      } is-clickable ${
                        dateValue !== 0 ? styles['hover-element'] : ''
                      }`}
                      onClick={dateHandler}
                      style={getStyle(dateValue)}
                    >
                      {dateValue}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={Math.random()}
                  className={`${
                    selectedOption === 'Year'
                      ? styles['array-element-year']
                      : styles['array-element']
                  } `}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Daydate;
