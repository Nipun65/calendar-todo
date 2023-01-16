import { Fragment, useEffect, useState } from "react";
import Daydate from "../Daydate/Daydate";
import Header from "../Header/Header";
import Card from "../Card/Card";
import styles from "./Calendar.module.css";
import {
  handleMonth,
  handleOption,
  handleToday,
  handleValue,
  handleView,
} from "../Handlers/Handlers";

const Calendar = () => {
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

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [years, setYears] = useState();
  useEffect((value) => {
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
  }, []);

  const [selectedOption, setSelectedOption] = useState("Month");

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
        className={styles["grid-item"]}
        setValue={(value) =>
          handleValue(date, view, years, setDate, setYears, value)
        }
        date={dateObj}
        month={Month}
        selectedOption={selectedOption}
        key={Math.random()}
      />
    );
  };

  const [view, setView] = useState("date");

  return (
    <Fragment>
      <Header
        setValue={(value) =>
          handleValue(date, view, years, setDate, setYears, value)
        }
        setView={(value) => handleView(value, setView, date, setYears, years)}
        date={date}
        view={view}
        selectedOption={selectedOption}
        setSelectedOption={(value) =>
          handleOption(setSelectedOption, setView, setDate, date, value)
        }
        setToday={() => handleToday(date, todayDate, setView, setDate)}
      />

      {view === "date" && selectedOption !== "Year" && (
        <Daydate
          setValue={(value) =>
            handleValue(date, view, years, setDate, setYears, value)
          }
          date={date}
          selectedOption={selectedOption}
        />
      )}

      {selectedOption === "Year" && (
        <div className={styles["grid-container-year"]}>
          {Array(12)
            .fill(0)
            .map((value, index) => renderElements(value, index))}
        </div>
      )}
      {view !== "date" && (
        <Card
          data={view === "months" ? Month : years}
          setValue={(value) =>
            handleMonth(
              value,
              Month,
              date,
              setDate,
              setView,
              view,
              years,
              setYears
            )
          }
        />
      )}
    </Fragment>
  );
};

export default Calendar;
