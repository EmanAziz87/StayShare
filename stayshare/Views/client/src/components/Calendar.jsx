import {useEffect, useState} from "react";
import '../styles/calendar.css';
import {useSelector} from "react-redux";

const Calendar = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(parseInt(new Date().toLocaleString("Default", {month: "numeric"}), 10));
    const [selectedMonthWord, setSelectedMonthWord] = useState(new Date().toLocaleString("Default", {month: "long"}))
    const [selectedYear, setSelectedYear] = useState(parseInt(new Date().toLocaleString("Default", {year: "numeric"}), 10))
    const allChoreDueDates = useSelector(state => state.choreDueDates);
    console.log("FROM CALENDAR: " + JSON.stringify(allChoreDueDates));
    console.log("DATE NUM in STATE: " + selectedMonth);
    
    useEffect(() => {
        daysInAMonth(parseInt(new Date().toLocaleString("Default", {month: "numeric"})), 10);
    }, []);
    
    const handleMonthIncrease = () => {
        if (selectedMonth + 1 < 13) {
            const newSelectedMonth = selectedMonth + 1;
            setSelectedMonth(newSelectedMonth);
            setSelectedMonthWord(new Date(selectedYear, (newSelectedMonth) - 1, 1).toLocaleString("Default", {month: "long"}));
            daysInAMonth(newSelectedMonth);
        } else {
            const newSelectedMonth = 1;
            const newSelectedYear = selectedYear + 1;
            setSelectedYear(newSelectedYear);
            setSelectedMonth(newSelectedMonth);
            setSelectedMonthWord(new Date(selectedYear, newSelectedMonth - 1, 1).toLocaleString("Default", {month: "long"}));
            daysInAMonth(newSelectedMonth);
        }
    }
    
    const handleMonthDecrease = () => {
        console.log("MONTH NUMBER: " + selectedMonth);
        if (selectedMonth - 1 > 0) {
            const newSelectedMonth = selectedMonth - 1;
            setSelectedMonth(newSelectedMonth);
            setSelectedMonthWord(new Date(selectedYear, (newSelectedMonth) - 1, 1).toLocaleString("Default", {month: "long"}));
            daysInAMonth(newSelectedMonth);
        } else {
            const newSelectedMonth = 12;
            const newSelectedYear = selectedYear - 1;
            setSelectedYear(newSelectedYear);
            setSelectedMonth(newSelectedMonth);
            setSelectedMonthWord(new Date(selectedYear, (newSelectedMonth) - 1, 1).toLocaleString("Default", {month: "long"}));
            daysInAMonth(newSelectedMonth);
        }
    }
    
    const daysInAMonth = (month) => {
        const daysInMonth = parseInt(new Date(selectedYear, month, 0).toLocaleString("Default", {day: "numeric"}), 10);
        setSelectedDays(allCalendarDays(daysInMonth));
    }
    
    
    const allCalendarDays = (daysInMonth) => {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    }
    
    
    return (
        <div>
            <div>
                {selectedMonthWord}{'\n'}
                {selectedYear}
                <br/>
                <button onClick={handleMonthDecrease}>Prev</button>
                <button onClick={handleMonthIncrease}>Next</button>
            </div>
            <div className="calendar-days-container">
                {selectedDays.length > 0 && selectedDays.map(day => (
                    <div className={`day-container day-container-${day}`}>
                        {day}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Calendar;