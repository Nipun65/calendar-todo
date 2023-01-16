import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import {
  forwardMonthHandler,
  backMonthHandler,
  forwardYearHandler,
  backYearHandler,
  viewHandler,
  handleFunc,
} from "../Handlers/Handlers";

const Header = ({
  date,
  setSelectedOption,
  selectedOption,
  view,
  setView,
  setValue,
  setToday,
}) => {
  let [year, setYear] = useState(date.year);
  let [month, setMonth] = useState(date.month);
  useEffect(
    (value) => {
      setMonth(date.month);
      setYear(date.year);
    },
    [date.month, date.year]
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
    date: date.date,
    currentYear: date.currentYear,
    currentMonth: date.currentMonth,
    selectedDate: date.selectedDate,
  };

  const getYearData = () => {
    let textContent = "";
    if (view === "date" && selectedOption !== "Year") {
      textContent += Month[month] + " ";
    }
    if (view === "years") {
      if (year % 10 !== 0) {
        textContent += `${year - (year % 10) + 1} - ${
          year - (year % 10) + 10
        } `;
      } else {
        textContent += `${year - 9}-${year} `;
      }
    }
    if (view === "date" || view === "months") {
      textContent += year + " ";
    }
    if (view === "multiyears") {
      textContent += `${year - (year % 100) + 1} - ${
        year - (year % 100) + 100
      } `;
    }
    return textContent;
  };

  return (
    <div className={styles["header"]}>
      <div className={`${styles["btnHover"]} ${styles["first-div"]}`}>
        {view !== "multiyears" && (
          <Button
            onClick={() =>
              backYearHandler(view, setValue, setYear, year, dateObj)
            }
            classes={styles["btn"]}
            textContent={"<<"}
          />
        )}
        {selectedOption !== "Year" && (
          <Button
            onClick={() =>
              backMonthHandler(
                view,
                setValue,
                month,
                setMonth,
                setYear,
                dateObj,
                year
              )
            }
            classes={styles["btn"]}
            disabled={date.year === 1}
            textContent={"<"}
          />
        )}
        <div className={styles["todaybtn-div"]}>
          <Button
            onClick={() => handleFunc(setToday)}
            classes={styles["todaybtn"]}
            textContent={"Today"}
          />
        </div>
      </div>
      <div
        className={`
         ${
           view !== "multiyears" && selectedOption !== "Year"
             ? styles["btnHover"]
             : ""
         } ${styles["second-div"]}`}
      >
        <Button
          onClick={() => viewHandler(view, setView)}
          classes={styles["btn"]}
          textContent={getYearData()}
          disabled={view === "multiyears" || selectedOption === "Year"}
        />
      </div>

      <div className={`${styles["third-div"]} ${styles["btnHover"]}`}>
        <div className={styles["dropdown"]}>
          <Dropdown
            view={view}
            option={list}
            setValue={(value) => handleFunc(setSelectedOption, value)}
          />
        </div>

        {selectedOption !== "Year" && (
          <Button
            onClick={() =>
              forwardMonthHandler(
                view,
                setValue,
                month,
                setMonth,
                setYear,
                year,
                dateObj
              )
            }
            classes={styles["btn"]}
            textContent={">"}
          />
        )}
        {view !== "multiyears" && (
          <Button
            onClick={() =>
              forwardYearHandler(view, setValue, setYear, year, dateObj)
            }
            classes={styles["btn"]}
            textContent={">>"}
          />
        )}
      </div>
    </div>
  );
};
export default Header;
