import {useEffect, useState} from "react";
import '../styles/calendar.css';
import {useSelector} from "react-redux";

const Calendar = () => {
    const [calendarDaysForMonth, setCalendarDaysForMonth] = useState([]);
    const allChoreDueDates = useSelector(state => state.choreDueDates);
    
    useEffect(() => {
        divsForAllCalendarDays(daysInAMonth());
    }, []);
    
    const daysInAMonth = () => {
        const currentDate = new Date();
        const currentMonth = parseInt(currentDate.toLocaleString("Default", {month: "numeric"}), 10);
        const currentYear = parseInt(currentDate.toLocaleString("Default", {year: "numeric"}), 10);

        const daysInMonth = parseInt(new Date(currentYear, currentMonth, 0).toLocaleString("Default", {day: "numeric"}), 10);
        return daysInMonth;
    }
    
    
    const divsForAllCalendarDays = (daysInMonth) => {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            console.log(i);
            days.push(i);
        }
        setCalendarDaysForMonth(days);
    }
    
    
    return (
        <div>
            <div className="calendar-days-container">
                {calendarDaysForMonth.length > 0 && calendarDaysForMonth.map(day => (
                    <div className={`day-container day-container-${day}`}>
                        {day}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Calendar;