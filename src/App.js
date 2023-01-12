import { Fragment, useEffect, useState } from "react";
import Daydate from "./components/Daydate/Daydate";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import "./App.css";
function App() {
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
  useEffect((value) => {}, [selectedOption]);
  const handleOption = (value) => {
    setSelectedOption(value);
    setView("date");
    setDate({ ...date });
  };
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
        className="grid-item"
        setValue={handleValue}
        date={dateObj}
        month={Month}
        selectedOption={selectedOption}
        key={Math.random()}
      />
    );
  };

  const handleValue = (value) => {
    date.year = +date.year;
    if (view === "multiyears") {
      let startYear = "";
      if (value === "forwardmonth") {
        startYear = date.year - (date.year % 100) + 100;
      } else if (value === "backmonth") {
        startYear = date.year - (date.year % 100) - 100;
      }

      let string = "";
      for (let i = 0; i < 10; i++) {
        string = `${startYear + 1} - ${startYear + 10}`;
        years[i] = string;
        startYear += 10;
      }

      date.year = +years[0].split("-")[0];
      setDate({ ...date });
      setYears([...years]);
    } else if (view === "years") {
      for (let i = 0; i < years.length; i++) {
        if (value === "forward") {
          years[i] += 100;
        } else if (value === "back") {
          years[i] -= 100;
        } else if (value === "forwardmonth") {
          years[i] += 10;
        } else if (value === "backmonth") {
          years[i] -= 10;
        }
      }
      date.year = years[0];
      setDate({ ...date });
    } else if (view === "months") {
      if (value === "forward") {
        date.year = date.year + 10;
      } else if (value === "back") {
        date.year = date.year - 10;
      } else if (value === "forwardmonth") {
        date.year = date.year + 1;
      } else if (value === "backmonth") {
        date.year = date.year - 1;
      }
      setDate({ ...date });
    } else {
      setDate({ ...value });
    }
  };

  const [view, setView] = useState("date");
  const handleView = (value) => {
    setView(value);
    let currentYear = 0;
    if (value === "multiyears") {
      let startYear = 0;
      if (date.year % 100 !== 0) {
        startYear = date.year - (date.year % 100) + 1;
      } else {
        startYear = date.year - 100 + 1;
      }
      let yearsArray = [];
      let string = "";
      for (let i = 0; i < 10; i++) {
        string = `${startYear} - ${startYear + 9}`;
        yearsArray.push(string);
        startYear += 10;
      }
      setYears([...yearsArray]);
    } else {
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

  const handleMonth = (value) => {
    const monthIndex = Month.findIndex((ele) => {
      return ele === value;
    });

    if (monthIndex !== -1) {
      date.month = monthIndex;
      setDate({ ...date });
      setView("date");
    } else if (view === "years") {
      date.year = value;
      setDate({ ...date });
      setView("months");
    } else if (view === "multiyears") {
      let startYear = +value.split("-")[0];
      date.year = startYear;
      setDate({ ...date });
      for (let i = 0; i < 10; i++) {
        years[i] = startYear;
        startYear++;
      }
      setView("years");
      setYears(years);
    }
  };

  const handleToday = () => {
    date.year = todayDate.getFullYear();
    date.month = todayDate.getMonth();
    date.date = todayDate.getDate();
    setView("date");
    setDate({ ...date });
  };
  return (
    <Fragment>
      <Header
        setValue={handleValue}
        setView={handleView}
        date={date}
        view={view}
        selectedOption={selectedOption}
        setSelectedOption={handleOption}
        setToday={handleToday}
      />

      {view === "date" && selectedOption !== "Year" && (
        <Daydate
          setValue={handleValue}
          date={date}
          selectedOption={selectedOption}
        />
      )}

      {selectedOption === "Year" && (
        <div className="grid-container-year">
          {Array(12)
            .fill(0)
            .map((value, index) => renderElements(value, index))}
        </div>
      )}
      {view !== "date" && (
        <Card data={view === "months" ? Month : years} setValue={handleMonth} />
      )}
    </Fragment>
  );
}

export default App;
