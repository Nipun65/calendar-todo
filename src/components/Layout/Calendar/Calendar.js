import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Daydate from '../../Common/Daydate/Daydate';
import Header from '../../Common/Header/Header';
import Card from '../../Common/Card/Card';
import styles from './Calendar.module.css';
import Todo from '../../Common/Todo/Todo';
import { MONTHS } from '../../../utils/Constants.utils';

function Calendar() {
  const todayDate = new Date();
  const [date, setDate] = useState({
    year: todayDate.getFullYear(),
    month: todayDate.getMonth(),
    date: todayDate.getDate(),
    currentYear: todayDate.getFullYear(),
    currentMonth: todayDate.getMonth(),
    selectedDate: {
      userYear: 0,
      userMonth: 0,
      userDate: 0,
    },
  });
  const [years, setYears] = useState();
  const [selectedOption, setSelectedOption] = useState('Month');
  const [view, setView] = useState('date');
  const history = useNavigate();
  const location = useLocation();

  // updates the view and years state. if view is multiyears then years state contains all decade years. in years view it contains one decade
  const handleView = (value) => {
    setView(value);
    let currentYear = 0;
    if (value === 'multiyears') {
      let startYear = 0;
      if (date.year % 100 !== 0) {
        startYear = date.year - (date.year % 100) + 1;
      } else {
        startYear = date.year - 100 + 1;
      }
      const yearsArray = [];
      let string = '';
      for (let i = 0; i < 10; i++) {
        string = `${startYear} - ${startYear + 9}`;
        yearsArray.push(string);
        startYear += 10;
      }
      setYears([...yearsArray]);
    } else if (value === 'years') {
      if (date.year % 10 !== 0) {
        currentYear = date.year - (date.year % 10) + 1;
      } else {
        currentYear = date.year - 9;
      }

      for (let i = 0; i < 10; i++) {
        years[i] = currentYear;
        currentYear++;
      }
    }
  };

  // validate user entered url and set date according to it
  const validateUrl = (locationObj) => {
    const pathnamePart = locationObj.pathname.split('/');
    if (pathnamePart.length === 2) {
      if (locationObj.search === '') {
        if (pathnamePart[1] === 'month' || pathnamePart[1] === 'year') {
          let newView = '';
          if (pathnamePart[1] === 'month') {
            newView = 'date';
          } else if (pathnamePart[1] === 'year') {
            newView = 'months';
          }
          setView(newView);
        } else if (pathnamePart[1] === 'todo') {
          setView('day');
          date.selectedDate.userDate = todayDate.getDate();
          date.selectedDate.userMonth = todayDate.getMonth();
          date.selectedDate.userYear = todayDate.getFullYear();
        }
      } else if (locationObj.search.length) {
        const secondpart = locationObj.search.split('?');
        const secondpartdivide = secondpart[1].split('=');
        const splitMonthYear = secondpartdivide[1].split('+');
        if (secondpartdivide[0] === pathnamePart[1]) {
          if (pathnamePart[1] === 'month') {
            if (
              splitMonthYear.length === 2 &&
              +splitMonthYear[0] > 0 &&
              +splitMonthYear[0] <= 12 &&
              +splitMonthYear[1] > 0
            ) {
              date.month = +splitMonthYear[0] - 1;
              date.year = +splitMonthYear[1];
            }
          } else if (pathnamePart[1] === 'year') {
            if (splitMonthYear.length === 1 && +splitMonthYear[0] > 0) {
              date.year = +splitMonthYear[0];
              if (selectedOption === 'Month') {
                setView('months');
              }
            }
          } else if (pathnamePart[1] === 'multiyear') {
            const splitsplitMonthYear = splitMonthYear[0].split('-');
            const startYear = +splitsplitMonthYear[0].split('(')[1];
            const endYear = +splitsplitMonthYear[1].split(')')[0];
            if (endYear - startYear === 9 && startYear % 10 === 1) {
              date.year = startYear;
              setView('years');
            } else if (endYear - startYear === 99 && startYear % 100 === 1) {
              date.year = startYear;
              handleView('multiyears');
            }
          }
        } else if (
          pathnamePart[1] === 'todo' &&
          secondpartdivide[0] === 'day'
        ) {
          if (
            splitMonthYear.length === 3 &&
            +splitMonthYear[1] > 0 &&
            +splitMonthYear[1] <= 12
          ) {
            const endDayOfTheMonth = new Date(
              +splitMonthYear[2],
              +splitMonthYear[1],
              0
            );
            if (
              +splitMonthYear[0] >= 1 &&
              splitMonthYear[0] <= endDayOfTheMonth.getDate()
            ) {
              date.selectedDate.userDate = +splitMonthYear[0];
              date.month = +splitMonthYear[1] - 1;
              date.year = +splitMonthYear[2];
              date.selectedDate.userMonth = +splitMonthYear[1] - 1;
              date.selectedDate.userYear = +splitMonthYear[2];
              setView('day');
            }
          }
        }
      }
    }
  };

  // set the years array when first time component render it will be used in Card component years view to show years and validate browser url if the url is not correct it'll redirect to today's date
  useEffect(() => {
    const yearsArray = [];
    let Currentyear = date.year;
    let CurrentyearCopy = date.year - (date.year % 10) + 1;
    while (CurrentyearCopy < Currentyear) {
      yearsArray.push(CurrentyearCopy);
      CurrentyearCopy++;
    }
    while (Currentyear % 10 !== 0) {
      yearsArray.push(Currentyear);
      Currentyear++;
      if (Currentyear % 10 === 0) {
        yearsArray.push(Currentyear);
        setYears(yearsArray);
      }
    }
    validateUrl(location);
  }, []);

  // handle navigation as per view
  useEffect(() => {
    let navigateTo = '';
    if (view === 'date') {
      if (
        date.month === todayDate.getMonth() &&
        date.year === todayDate.getFullYear()
      ) {
        if (selectedOption === 'Month') {
          navigateTo = '/month';
        } else {
          navigateTo = '/year';
        }
      } else if (selectedOption === 'Year') {
        navigateTo = `/year?year=${date.year}`;
      } else {
        navigateTo = `/month?month=${date.month + 1}+${date.year}`;
      }
    }
    if (view === 'months') {
      if (date.year === todayDate.getFullYear()) {
        navigateTo = '/year';
      } else {
        navigateTo = `/year?year=${date.year}`;
      }
    }
    if (view === 'years') {
      navigateTo = `/multiyear?multiyear=(${date.year - (date.year % 10) + 1}-${
        date.year - (date.year % 10) + 10
      })`;
    }
    if (view === 'multiyears') {
      navigateTo = `/multiyear?multiyear=(${
        date.year - (date.year % 100) + 1
      }-${date.year - (date.year % 100) + 100})`;
    }
    if (view === 'day') {
      if (
        date.selectedDate.userDate === todayDate.getDate() &&
        date.selectedDate.userMonth === todayDate.getMonth() &&
        date.selectedDate.userYear === todayDate.getFullYear()
      ) {
        navigateTo = '/todo';
      } else {
        navigateTo = `/todo?day=${date.selectedDate.userDate}+${
          date.month + 1
        }+${date.year}`;
      }
    }
    history(navigateTo);
  }, [view, date.month, date.year, date.selectedDate.userDate, selectedOption]);

  // updating the years array according to clicked event and view
  const handleValue = (value) => {
    date.year = +date.year;
    if (view === 'multiyears') {
      let startYear = '';
      if (value === 'singleforward') {
        startYear = date.year - (date.year % 100) + 100;
      } else if (value === 'singlebackward') {
        startYear = date.year - (date.year % 100) - 100;
      }

      let string = '';
      for (let i = 0; i < 10; i++) {
        string = `${startYear + 1} - ${startYear + 10}`;
        years[i] = string;
        startYear += 10;
      }

      date.year = +years[0].split('-')[0];
      setDate({ ...date });
      setYears([...years]);
    } else if (view === 'years') {
      for (let i = 0; i < years.length; i++) {
        if (value === 'doubleforward') {
          years[i] += 100;
        } else if (value === 'doublebackward') {
          years[i] -= 100;
        } else if (value === 'singleforward') {
          years[i] += 10;
        } else if (value === 'singlebackward') {
          years[i] -= 10;
        }
      }
      const [firstYear] = years;
      date.year = firstYear;
      setDate({ ...date });
    } else if (view === 'months') {
      if (value === 'doubleforward') {
        date.year += 10;
      } else if (value === 'doublebackward') {
        date.year -= 10;
      } else if (value === 'singleforward') {
        date.year += 1;
      } else if (value === 'singlebackward') {
        date.year -= 1;
      }
      setDate({ ...date });
    } else if (view === 'day') {
      if (value === 'doubleforward') {
        if (date.selectedDate.userMonth === 11) {
          date.selectedDate.userMonth = 0;
          date.selectedDate.userYear += 1;
        } else {
          date.selectedDate.userMonth += 1;
        }
      } else if (value === 'doublebackward') {
        if (date.selectedDate.userMonth === 0) {
          date.selectedDate.userMonth = 11;
          date.selectedDate.userYear -= 1;
        } else {
          date.selectedDate.userMonth -= 1;
        }
      } else if (value === 'singleforward') {
        const lastDay = new Date(
          date.selectedDate.userYear,
          date.selectedDate.userMonth + 1,
          0
        );
        if (date.selectedDate.userDate === lastDay.getDate()) {
          if (date.selectedDate.userMonth === 11) {
            date.selectedDate.userDate = 1;
            date.selectedDate.userMonth = 0;
            date.selectedDate.userYear += 1;
          } else {
            date.selectedDate.userDate = 1;
            date.selectedDate.userMonth += 1;
          }
        } else {
          date.selectedDate.userDate += 1;
        }
      } else if (value === 'singlebackward') {
        if (date.selectedDate.userDate === 1) {
          if (date.month === 0) {
            const lastDay = new Date(
              date.selectedDate.userYear,
              date.selectedDate.userMonth + 1,
              0
            );
            date.selectedDate.userYear -= 1;
            date.selectedDate.userMonth = 11;
            date.selectedDate.userDate = lastDay.getDate();
          } else {
            const lastDay = new Date(
              date.selectedDate.userYear,
              date.selectedDate.userMonth,
              0
            );
            date.selectedDate.userDate = lastDay.getDate();
            date.selectedDate.userMonth -= 1;
          }
        } else {
          date.selectedDate.userDate -= 1;
        }
      }
      date.month = date.selectedDate.userMonth;
      date.year = date.selectedDate.userYear;
      setDate({ ...date });
    } else {
      setDate({ ...value });
    }
  };

  // handle selected month or year in card
  const handleMonthorYear = (value) => {
    const monthIndex = MONTHS.findIndex((ele) => ele === value);
    if (monthIndex !== -1) {
      date.month = monthIndex;
      setDate({ ...date });
      setView('date');
    } else if (view === 'years') {
      date.year = value;
      setDate({ ...date });
      if (selectedOption !== 'Year') {
        setView('months');
      } else {
        setView('date');
      }
    } else if (view === 'multiyears') {
      let startYear = +value.split('-')[0];
      date.year = startYear;
      setDate({ ...date });
      for (let i = 0; i < 10; i++) {
        years[i] = startYear;
        startYear++;
      }
      setView('years');
      setYears(years);
    }
  };

  // to handle today button
  const handleToday = () => {
    date.year = todayDate.getFullYear();
    date.month = todayDate.getMonth();
    date.date = todayDate.getDate();
    date.selectedDate.userYear = todayDate.getFullYear();
    date.selectedDate.userMonth = todayDate.getMonth();
    date.selectedDate.userDate = todayDate.getDate();

    if (view !== 'day') {
      setView('date');
    }
    setDate({ ...date });
  };

  // to handle selected option in dropdown
  const handleOption = (value) => {
    setSelectedOption(value);
    setView('date');
    setDate({ ...date });
  };

  // function for rendering elements in case of selected option is year in dropdown
  const renderElements = (value, index) => {
    const dateObj = {
      year: date.year,
      month: index,
      date: date.date,
      currentMonth: todayDate.getMonth(),
      currentYear: todayDate.getFullYear(),
      selectedDate: {
        userYear: date.selectedDate.userYear,
        userMonth: date.selectedDate.userMonth,
        userDate: date.selectedDate.userDate,
      },
    };
    return (
      <Daydate
        className={styles['grid-item']}
        setValue={handleValue}
        date={dateObj}
        month={MONTHS}
        selectedOption={selectedOption}
        key={Math.random()}
        setView={handleView}
      />
    );
  };

  return (
    <>
      <Header
        setValue={handleValue}
        setView={handleView}
        setSelectedOption={handleOption}
        setToday={handleToday}
        date={date}
        view={view}
        selectedOption={selectedOption}
      />

      {view === 'date' && selectedOption !== 'Year' && (
        <Daydate
          setValue={handleValue}
          setView={handleView}
          date={date}
          selectedOption={selectedOption}
        />
      )}

      {selectedOption === 'Year' && view === 'date' && (
        <div className={styles['grid-container-year']}>
          {Array(12)
            .fill(0)
            .map((value, index) => renderElements(value, index))}
        </div>
      )}
      {/* Card component renders the data. if it's months view then it's will show all months and years view it will show years state */}
      {view !== 'date' && view !== 'day' && (
        <Card
          data={view === 'months' ? MONTHS : years}
          setValue={handleMonthorYear}
        />
      )}
      {view === 'day' && <Todo date={date} Month={MONTHS} />}
    </>
  );
}

export default Calendar;
