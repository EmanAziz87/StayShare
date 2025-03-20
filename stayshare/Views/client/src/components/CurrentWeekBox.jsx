import '../styles/currentWeekBox.css';
const CurrentWeekBox = ({userChores}) => {
    const weekDays= [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    console.log("CURRENT WEEK BOX:" + JSON.stringify(userChores));
    const dateTest = userChores[0].chores[0].assignedDate;
    const dateSplit = dateTest.substring(0, 10).split("-");
    console.log("DATE SPLIT TEST:" + dateSplit);
    const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
    const month = date.toLocaleString("Default", {month: "long"});
    const day = date.toLocaleString("Default", {weekday: "long"});
    
    console.log("DAY LONG:" + day);
    console.log("MONTH LONG: " + month);
    
    return (
        <div className="current-week-box-container">
            {weekDays.map(day => {
                return (
                    <div className="current-week-day-container">
                        {day}
                    </div>
                )
            })}
        </div>
    )
}

export default CurrentWeekBox;