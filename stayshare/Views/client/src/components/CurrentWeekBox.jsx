import '../styles/currentWeekBox.css';
import {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import {dueDatesForAllChores} from "../store/slices/choreDueDatesSlice.js";
const CurrentWeekBox = ({userChores}) => {
    const [allAssignedChores, setAllAssignedChores] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        choreDueDatesForTheYear()
    }, []);
    
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
        let allChoresWithDueDates = []
        for (let j = 0; j < userChores[0].chores.length; j++) {
            const dateTest = userChores[0].chores[j].assignedDate;
            const dateSplit = dateTest.substring(0, 10).split("-");
            const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
            
            const currentDate = new Date();
            const currentYear = parseInt(currentDate.toLocaleString("Default", {year: "numeric"}), 10);
            const intervalForChore = userChores[0].chores[j].intervalDays;
            
            let allChoreDueDatesForYear = [];
            
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
            const choreInfoWithDueDates = {choreName: userChores[0].chores[j].taskName, choreId: userChores[0].chores[j].choreId, choreDays: allChoreDueDatesForYear};
            allChoresWithDueDates.push(choreInfoWithDueDates);
            allChoreDueDatesForYear = [];
        }
        setAllAssignedChores(allChoresWithDueDates);
        dispatch(dueDatesForAllChores(allChoresWithDueDates));
    }
    
    const findChoresForThisWeek = (day, month) => {
        let choresFound = [];
        for (let i = 0; i < allAssignedChores.length; i++) {
            const choreDay = allAssignedChores[i].choreDays.find(choreDay => {
                return Number(choreDay.month) === Number(month) && Number(choreDay.day) === Number(day);
            });
            
            if (choreDay) {
                choresFound.push({...allAssignedChores[i], choreDays: choreDay});
            }
        }
        return choresFound;
    }
    
    const findMonthDayForWeekDay = (weekDay) => {
        
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
        const currentMonth = parseInt(dateNow.toLocaleString("Default", {month: "numeric"}), 10);
        const currentYear = parseInt(dateNow.toLocaleString("Default", {year: "numeric"}), 10);
        let month = dateNow.toLocaleString("Default", {month: "long"});

        let monthNumber = currentMonth;

        let dayOfMonthForInput;
        
        if (weekDaysNumbered[currentWeekDay] >= weekDaysNumbered[weekDay]) {
            dayOfMonthForInput = currentDayOfMonth - (weekDaysNumbered[currentWeekDay] - weekDaysNumbered[weekDay]);
        } else if (weekDaysNumbered[currentWeekDay] < weekDaysNumbered[weekDay]) {
            const lastDayOfMonth = parseInt(new Date(currentYear, currentMonth, 0).toLocaleString("Default", {day: "numeric"}), 10);
            if (currentDayOfMonth + (weekDaysNumbered[weekDay] - weekDaysNumbered[currentWeekDay]) > lastDayOfMonth) {
                dayOfMonthForInput = (currentDayOfMonth + (weekDaysNumbered[weekDay] - weekDaysNumbered[currentWeekDay])) - lastDayOfMonth;
                month = new Date(currentYear, currentMonth, dayOfMonthForInput).toLocaleString("Default", {month: "long"});
                monthNumber = parseInt(new Date(currentYear, currentMonth, dayOfMonthForInput).toLocaleString("Default", {month: "numeric"}), 10);
            } else {
                dayOfMonthForInput = currentDayOfMonth + (weekDaysNumbered[weekDay] - weekDaysNumbered[currentWeekDay]);
            }
        }
        

        const choresToday = findChoresForThisWeek(dayOfMonthForInput, monthNumber);
        
        let choresFound = '';
        
        choresToday.forEach(chore => {
            choresFound += chore.choreName + " | "
        });

        if (currentWeekDay === weekDay) {
            return `**Today** ${month} ${dayOfMonthForInput} - ${choresFound}`;
        }
        
        return `${month} ${dayOfMonthForInput} ${choresFound}`;
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