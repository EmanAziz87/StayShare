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
    
    
    const choreDueDatesForTheYear = () => {
        const dateTest = userChores[0].chores[0].assignedDate;
        const dateSplit = dateTest.substring(0, 10).split("-");
        const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        
        const currentDate = new Date();
        const currentYear = parseInt(currentDate.toLocaleString("Default", {year: "numeric"}), 10);
        const intervalForChore = userChores[0].chores[0].intervalDays;
        
        const allChoreDueDatesForYear = [];
        
        let dayAssigned = parseInt(date.toLocaleString("Default", {day: "numeric"}), 10);
        let monthAssigned = parseInt(date.toLocaleString("Default", {month: "numeric"}), 10);
        const lastDayOfMonth = (month) => {
            return parseInt(new Date(currentYear, month, 0).toLocaleString("Default", {day: "numeric"}), 10);
        }
        
        while (monthAssigned < 13) {
            const lastDayMonth = lastDayOfMonth(monthAssigned);
            for (let i = dayAssigned; i < lastDayMonth; i += intervalForChore) {
                allChoreDueDatesForYear.push({month: monthAssigned, day: i});
                if (i + intervalForChore >= lastDayMonth) {
                    dayAssigned = (i + intervalForChore) - lastDayMonth
                }
            }
            monthAssigned++;
        }
        
        console.log(allChoreDueDatesForYear);

        
        



    }
    
    choreDueDatesForTheYear();
    const findMonthDayForWeekDay = (weekDay) => {
        const dateTest = userChores[0].chores[0].assignedDate;
        const dateSplit = dateTest.substring(0, 10).split("-");
        const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        const dateNow = new Date();
        
        const weekDaysNumbered = {
            "Monday": 0,
            "Tuesday": 1,
            "Wednesday": 2,
            "Thursday": 3,
            "Friday": 4,
            "Saturday": 5,
            "Sunday": 6
        }
        
        const currentWeekDay = dateNow.toLocaleString("Default", {weekday:"long"});
        const currentDayOfMonth = parseInt(dateNow.toLocaleString("Default", {day: "numeric"}), 10);
        console.log(currentDayOfMonth)
        let dayOfMonthForInput;
        
        if (weekDaysNumbered[currentWeekDay] >= weekDaysNumbered[weekDay]) {
            dayOfMonthForInput = currentDayOfMonth - (weekDaysNumbered[currentWeekDay] - weekDaysNumbered[weekDay]);
        } else if (weekDaysNumbered[currentWeekDay] < weekDaysNumbered[weekDay]) {
            dayOfMonthForInput = currentDayOfMonth + (weekDaysNumbered[weekDay] - weekDaysNumbered[currentWeekDay]);
        }

        const month = date.toLocaleString("Default", {month: "long"});
        if (currentWeekDay === weekDay) {
            return `**Today** ${month} ${dayOfMonthForInput}`;

        }
        return `${month} ${dayOfMonthForInput}`;
    }
    
    return (
        <div className="current-week-box-container">
            {weekDays.map(day => {
                const dayOfMonth = findMonthDayForWeekDay(day);
                return (
                    <div className="current-week-day-container">
                        <div>
                            {day}
                        </div>
                        <div>
                            {dayOfMonth}
                        </div>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default CurrentWeekBox;