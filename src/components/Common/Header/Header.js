import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../../UI/Button/Button';

function Header({
  date,
  setSelectedOption,
  selectedOption,
  view,
  setView,
  setValue,
  setToday,
}) {
  const [year, setYear] = useState(date.year);
  const [month, setMonth] = useState(date.month);
  let yearDuplicate = year;
  let monthDuplicate = month;
  useEffect(() => {
    setMonth(date.month);
    setYear(date.year);
  }, [date.month, date.year]);
  const Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dropdownlList = ['Month', 'Year'];

  const dateObj = {
    year,
    month,
    date: date.date,
    currentYear: date.currentYear,
    currentMonth: date.currentMonth,
    selectedDate: date.selectedDate,
  };

  const selectedOptionHandler = (value) => {
    setView('months');
    setSelectedOption(value);
  };

  // handling the back year conditionally if it's in date view then update the date object here or in other view update values in parent component
  const backYearHandler = () => {
    if (
      view === 'months' ||
      view === 'years' ||
      view === 'multiyears' ||
      view === 'day'
    ) {
      setValue('back');
    }

    if (selectedOption === 'Year') {
      yearDuplicate = year - 10;
      setYear(yearDuplicate);
      dateObj.year = yearDuplicate;
      setValue({ ...dateObj });
    } else {
      yearDuplicate = year;
      setYear(--yearDuplicate);
      dateObj.year = yearDuplicate;
      setValue({ ...dateObj });
    }
  };

  // handling the forward year conditionally if it's in date view then update the date object here or in other view update values in parent component
  const forwardYearHandler = () => {
    if (
      view === 'months' ||
      view === 'years' ||
      view === 'multiyears' ||
      view === 'day'
    ) {
      setValue('forward');
    }
    if (selectedOption === 'Year') {
      yearDuplicate = year + 10;
      setYear(yearDuplicate);
      dateObj.year = yearDuplicate;
      setValue({ ...dateObj });
    } else {
      yearDuplicate = year;
      setYear(++yearDuplicate);
      dateObj.year = yearDuplicate;
      setValue({ ...dateObj });
    }
  };

  // handling the back month conditionally if it's in date view then update the date object here or in other view update values in parent component
  const backMonthHandler = () => {
    if (
      view === 'months' ||
      view === 'years' ||
      view === 'multiyears' ||
      view === 'day'
    ) {
      setValue('backmonth');
    } else {
      if (selectedOption === 'Year') {
        yearDuplicate = year;
        setYear(--yearDuplicate);
        dateObj.year = yearDuplicate;
        setValue({ ...dateObj });
      } else if (month === 0) {
        setMonth(11);
        yearDuplicate = year;
        setYear(--yearDuplicate);
        dateObj.month = 11;
        dateObj.year = yearDuplicate;
      } else {
        monthDuplicate = month;
        setMonth(--monthDuplicate);
        dateObj.month = monthDuplicate;
      }
      setValue({ ...dateObj });
    }
  };

  // handling the forward month conditionally if it's in date view then update the date object here or in other view update values in parent component
  const forwardMonthHandler = () => {
    if (
      view === 'months' ||
      view === 'years' ||
      view === 'multiyears' ||
      view === 'day'
    ) {
      setValue('forwardmonth');
    } else {
      if (selectedOption === 'Year') {
        yearDuplicate = year;
        setYear(++yearDuplicate);
        dateObj.year = yearDuplicate;
        setValue({ ...dateObj });
      } else if (month === 11) {
        setMonth(0);
        yearDuplicate = year;
        setYear(++yearDuplicate);
        dateObj.month = 0;
        dateObj.year = yearDuplicate;
      } else {
        monthDuplicate = month;
        setMonth(++monthDuplicate);
        dateObj.month = monthDuplicate;
      }
      setValue({ ...dateObj });
    }
  };

  // setting the view
  const viewHandler = () => {
    if (view === 'day') {
      setView('date');
    } else if (view === 'date') {
      if (selectedOption === 'Year') {
        setView('years');
      } else {
        setView('months');
      }
    } else if (view === 'months') {
      setView('years');
    } else if (view === 'years') {
      setView('multiyears');
    }
  };

  // to get today's date
  const handleToday = () => {
    setToday();
  };

  const getYearData = () => {
    let textContent = '';

    if (view === 'day') {
      textContent += `${date.selectedDate.userDate} ${
        Month[date.selectedDate.userMonth]
      } ${date.selectedDate.userYear}`;
    }

    if (view === 'date' && selectedOption !== 'Year') {
      textContent += `${Month[month]} `;
    }
    if (view === 'years') {
      if (year % 10 !== 0) {
        textContent += `${year - (year % 10) + 1} - ${
          year - (year % 10) + 10
        } `;
      } else {
        textContent += `${year - 9}-${year} `;
      }
    }
    if (view === 'date' || view === 'months') {
      textContent += `${year} `;
    }
    if (view === 'multiyears') {
      textContent += `${year - (year % 100) + 1} - ${
        year - (year % 100) + 100
      } `;
    }
    return textContent;
  };

  return (
    <div className={styles.header}>
      <div className={`${styles.btnHover} ${styles['first-div']}`}>
        {view !== 'multiyears' && (
          <Button
            onClick={backYearHandler}
            classes={styles.btn}
            textContent="<<"
          />
        )}

        <Button
          onClick={backMonthHandler}
          classes={styles.btn}
          disabled={date.year === 1}
          textContent="<"
        />

        <div className={styles['todaybtn-div']}>
          <Button
            onClick={handleToday}
            classes={styles.todaybtn}
            textContent="Today"
          />
        </div>
      </div>
      <div
        className={`
         ${
           view !== 'multiyears' && selectedOption !== 'Year'
             ? styles.btnHover
             : ''
         } ${styles['second-div']}`}
      >
        <Button
          onClick={viewHandler}
          classes={styles.btn}
          textContent={getYearData()}
          disabled={view === 'multiyears'}
        />
      </div>

      <div className={`${styles['third-div']} ${styles.btnHover}`}>
        <div className={styles.dropdown}>
          <Dropdown
            view={view}
            option={dropdownlList}
            setValue={selectedOptionHandler}
          />
        </div>

        <Button
          onClick={forwardMonthHandler}
          classes={styles.btn}
          textContent=">"
        />

        {view !== 'multiyears' && (
          <Button
            onClick={forwardYearHandler}
            classes={styles.btn}
            textContent=">>"
          />
        )}
      </div>
    </div>
  );
}
Header.defaultProps = {
  date: {},
};
export default Header;
