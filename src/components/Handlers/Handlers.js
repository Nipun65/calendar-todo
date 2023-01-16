export const backMonthHandler = (
  view,
  setValue,
  month,
  setMonth,
  setYear,
  dateObj,
  year
) => {
  if (view === "months" || view === "years" || view === "multiyears") {
    setValue("backmonth");
  } else {
    if (month === 0) {
      setMonth(11);
      setYear(--year);
      dateObj.month = 11;
      dateObj.year = year;
    } else {
      setMonth(--month);
      dateObj.month = month;
    }
    setValue({ ...dateObj });
  }
};

export const forwardMonthHandler = (
  view,
  setValue,
  month,
  setMonth,
  setYear,
  year,
  dateObj
) => {
  if (view === "months" || view === "years" || view === "multiyears") {
    setValue("forwardmonth");
  } else {
    if (month === 11) {
      setMonth(0);
      setYear(++year);
      dateObj.month = 0;
      dateObj.year = year;
    } else {
      setMonth(++month);
      dateObj.month = month;
    }
    setValue({ ...dateObj });
  }
};

export const backYearHandler = (view, setValue, setYear, year, dateObj) => {
  if (view === "months" || view === "years" || view === "multiyears") {
    setValue("back");
  }
  setYear(--year);
  dateObj.year = year;
  setValue({ ...dateObj });
};
export const forwardYearHandler = (view, setValue, setYear, year, dateObj) => {
  if (view === "months" || view === "years" || view === "multiyears") {
    setValue("forward");
  }
  setYear(++year);
  dateObj.year = year;
  setValue({ ...dateObj });
};
export const viewHandler = (view, setView) => {
  if (view === "date") {
    setView("months");
  } else if (view === "months") {
    setView("years");
  } else if (view === "years") {
    setView("multiyears");
  }
};

export const handleFunc = (Func, setvalue) => {
  if (setvalue) {
    Func(setvalue);
  } else {
    Func();
  }
};
export const handleOptionClick = (
  setShowMenu,
  setSelectedOption,
  showMenu,
  setValue,
  value
) => {
  setShowMenu(!showMenu);
  setSelectedOption(value.target.textContent);
  setValue(value.target.textContent);
};

export const dateHandler = (date, event, setValue) => {
  date.selectedDate = {
    userYear: date.year,
    userMonth: date.month,
    userDate: +event.target.textContent,
  };
  setValue(date);
};

export const handleOption = (
  setSelectedOption,
  setView,
  setDate,
  date,
  value
) => {
  setSelectedOption(value);
  setView("date");
  setDate({ ...date });
};

export const handleValue = (date, view, years, setDate, setYears, value) => {
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

export const handleView = (value, setView, date, setYears, years) => {
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

export const handleMonth = (
  value,
  Month,
  date,
  setDate,
  setView,
  view,
  years,
  setYears
) => {
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

export const handleToday = (date, todayDate, setView, setDate) => {
  date.year = todayDate.getFullYear();
  date.month = todayDate.getMonth();
  date.date = todayDate.getDate();
  setView("date");
  setDate({ ...date });
};
