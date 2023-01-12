import styles from "./Daydate.module.css";

const Daydate = (props) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startYear = props.date.year;
  const startMonth = props.date.month;

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

  const dateHandler = (event) => {
    props.date.selectedDate = {
      userYear: props.date.year,
      userMonth: props.date.month,
      userDate: +event.target.textContent,
    };
    props.setValue(props.date);
  };
  return (
    <div
      className={`${styles["main-div"]} ${
        props.selectedOption === "Year" ? styles["grid-item"] : ""
      }`}
    >
      {props.selectedOption === "Year" && (
        <div className={styles["month"]}>{props.month[props.date.month]}</div>
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
              props.selectedOption === "Year"
                ? styles["array-year"]
                : styles["array"]
            }`}
            key={Math.random()}
          >
            {value.map((date, index) => {
              if (date) {
                return (
                  <div
                    key={Math.random()}
                    className={`${
                      props.selectedOption === "Year"
                        ? styles["array-element-year"]
                        : styles["array-element"]
                    }`}
                    onClick={dateHandler}
                    style={
                      props.date.month === props.date.currentMonth &&
                      props.date.date === date &&
                      props.date.currentYear === +props.date.year
                        ? { backgroundColor: "#81d5ea" }
                        : props.date.selectedDate.userDate === date &&
                          props.date.month === props.date.selectedDate.userMonth
                        ? { backgroundColor: "rgb(201,234,255)", opacity: 0.5 }
                        : {}
                    }
                  >
                    {date}
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
