import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";

const Header = (props) => {
  let [year, setYear] = useState(props.date.year);
  let [month, setMonth] = useState(props.date.month);
  useEffect(
    (value) => {
      setMonth(props.date.month);
      setYear(props.date.year);
    },
    [props.date.month, props.date.year]
  );
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
  const list = ["Month", "Year"];

  let dateObj = {
    year: year,
    month: month,
    date: props.date.date,
    currentYear: props.date.currentYear,
    currentMonth: props.date.currentMonth,
    selectedDate: props.date.selectedDate,
  };
  const selectedOption = (value) => {
    props.setSelectedOption(value);
  };

  const backYearHandler = () => {
    if (
      props.view === "months" ||
      props.view === "years" ||
      props.view === "multiyears"
    ) {
      props.setValue("back");
    }
    setYear(--year);
    dateObj.year = year;
    props.setValue({ ...dateObj });
  };
  const forwardYearHandler = () => {
    if (
      props.view === "months" ||
      props.view === "years" ||
      props.view === "multiyears"
    ) {
      props.setValue("forward");
    }
    setYear(++year);
    dateObj.year = year;
    props.setValue({ ...dateObj });
  };

  const backMonthHandler = () => {
    if (
      props.view === "months" ||
      props.view === "years" ||
      props.view === "multiyears"
    ) {
      props.setValue("backmonth");
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
      props.setValue({ ...dateObj });
    }
  };

  const forwardMonthHandler = () => {
    if (
      props.view === "months" ||
      props.view === "years" ||
      props.view === "multiyears"
    ) {
      props.setValue("forwardmonth");
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
      props.setValue({ ...dateObj });
    }
  };
  const viewHandler = (view) => {
    if (props.view === "date") {
      props.setView("months");
    } else if (props.view === "months") {
      props.setView("years");
    } else if (props.view === "years") {
      props.setView("multiyears");
    }
  };
  const handleToday = (value) => {
    props.setToday();
  };

  const getYearData = () => {
    let textContent = "";
    if (props.view === "date" && props.selectedOption !== "Year") {
      textContent += Month[month] + " ";
    }
    if (props.view === "years") {
      if (year % 10 !== 0) {
        textContent += `${year - (year % 10) + 1} - ${
          year - (year % 10) + 10
        } `;
      } else {
        textContent += `${year - 9}-${year} `;
      }
    }
    if (props.view === "date" || props.view === "months") {
      textContent += year + " ";
    }
    if (props.view === "multiyears") {
      textContent += `${year - (year % 100) + 1} - ${
        year - (year % 100) + 100
      } `;
    }
    return textContent;
  };

  return (
    <div className={styles["header"]}>
      <div className={`${styles["btnHover"]} ${styles["first-div"]}`}>
        {props.view !== "multiyears" && (
          <Button
            onClick={backYearHandler}
            classes={styles["btn"]}
            textContent={"<<"}
          />
        )}
        {props.selectedOption !== "Year" && (
          <Button
            onClick={backMonthHandler}
            classes={styles["btn"]}
            disabled={props.date.year === 1}
            textContent={"<"}
          />
        )}
        <div className={styles["todaybtn-div"]}>
          <Button
            onClick={handleToday}
            classes={styles["todaybtn"]}
            textContent={"Today"}
          />
        </div>
      </div>
      <div
        className={`
         ${
           props.view !== "multiyears" && props.selectedOption !== "Year"
             ? styles["btnHover"]
             : ""
         } ${styles["second-div"]}`}
      >
        <Button
          onClick={viewHandler}
          classes={styles["btn"]}
          textContent={getYearData()}
          disabled={
            props.view === "multiyears" || props.selectedOption === "Year"
          }
        />
      </div>

      <div className={`${styles["third-div"]} ${styles["btnHover"]}`}>
        <div className={styles["dropdown"]}>
          <Dropdown view={props.view} option={list} setValue={selectedOption} />
        </div>

        {props.selectedOption !== "Year" && (
          <Button
            onClick={forwardMonthHandler}
            classes={styles["btn"]}
            textContent={">"}
          />
        )}
        {props.view !== "multiyears" && (
          <Button
            onClick={forwardYearHandler}
            classes={styles["btn"]}
            textContent={">>"}
          />
        )}
      </div>
    </div>
  );
};
export default Header;
