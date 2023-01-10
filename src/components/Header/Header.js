import { useEffect, useState } from "react";
import styles from "./Header.module.css";

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
  let dateObj = {
    year: year,
    month: month,
    date: props.date.date,
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

  return (
    <div className={styles["header"]}>
      <div className={styles["btnHover"]}>
        {props.view !== "multiyears" && (
          <button
            onClick={backYearHandler}
            type="button"
            className={styles["btn"]}
          >
            {"<<"}
          </button>
        )}
        <button
          onClick={backMonthHandler}
          type="button"
          className={styles["btn"]}
        >
          {"<"}
        </button>
      </div>
      <div
        className={props.view !== "multiyears" ? styles["btnHover"] : ""}
        style={{ minWidth: "50px", display: "flex", alignItems: "center" }}
      >
        <button
          onClick={viewHandler}
          disabled={props.view === "multiyears"}
          className={styles["btn"]}
        >
          {props.view === "date" && <div>{Month[month]}</div>}
          {props.view === "years" &&
            (year % 10 !== 0 ? (
              <div>
                {year - (year % 10) + 1} - {year - (year % 10) + 10}
              </div>
            ) : (
              <div>
                {year - 9}-{year}
              </div>
            ))}

          {(props.view === "date" || props.view === "months") && (
            <div>{year}</div>
          )}
          {props.view === "multiyears" && (
            <div>
              {year - (year % 100) + 1} - {year - (year % 100) + 100}
            </div>
          )}
        </button>
      </div>
      <div className={styles["btnHover"]}>
        <button
          onClick={forwardMonthHandler}
          type="button"
          className={styles["btn"]}
        >
          {">"}
        </button>
        {props.view !== "multiyears" && (
          <button
            onClick={forwardYearHandler}
            type="button"
            className={styles["btn"]}
          >
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
