import styles from "./Daydate.module.css";
import { dateHandler } from "../Handlers/Handlers";

const Daydate = ({ date, setValue, selectedOption, month }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startYear = date.year;
  const startMonth = date.month;

  let daywisedates = Array(6)
    .fill()
    .map(() => Array(7).fill(0));

  const fillTheArray = (i, startDay, end) => {
    let date = 1;
    let week = 0;
    while (date <= end) {
      daywisedates[week][startDay % 7] = date;
      startDay++;
      date++;
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

  return (
    <div
      className={`${styles["main-div"]} ${
        selectedOption === "Year" ? styles["grid-item"] : ""
      }`}
    >
      {selectedOption === "Year" && (
        <div className={styles["month"]}>{month[date.month]}</div>
      )}
      <div className={styles["days"]}>
        {days.map((value) => (
          <div key={Math.random()} className={styles["days-ele"]}>
            {value}
          </div>
        ))}
      </div>
      <div>
        {daywisedates.map((value) => (
          <div
            className={`${
              selectedOption === "Year" ? styles["array-year"] : styles["array"]
            }`}
            key={Math.random()}
          >
            {value.map((dateValue) => {
              if (dateValue) {
                return (
                  <div
                    key={Math.random()}
                    className={`${
                      selectedOption === "Year"
                        ? styles["array-element-year"]
                        : styles["array-element"]
                    }`}
                    onClick={(event) => dateHandler(date, event, setValue)}
                    style={
                      date.month === date.currentMonth &&
                      date.date === dateValue &&
                      date.currentYear === +date.year
                        ? { backgroundColor: "#81d5ea" }
                        : date.selectedDate?.userDate === dateValue &&
                          date.month === date.selectedDate.userMonth
                        ? { backgroundColor: "rgb(201,234,255)", opacity: 0.5 }
                        : {}
                    }
                  >
                    {dateValue}
                  </div>
                );
              } else {
                return (
                  <div
                    key={Math.random()}
                    className={styles["array-element"]}
                  ></div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Daydate;
