import {useEffect, useState} from "react";
import {choreCompletionService} from "../api/apiCalls.js";
import {Button} from "@mui/material";


const ChoreHome = ({handleCalendarVisibility, calendarVisible, yearMonthDay}) => {
    const [choreCompletions, setChoreCompletions] = useState(null);
    
    useEffect(() => {
        const fetchChoreCompletions = async () => {
            try {
                const dateFormatted = [yearMonthDay.year, yearMonthDay.month, yearMonthDay.day].join("-");
                const choreCompletions = await choreCompletionService.getChoreCompletionByDate(dateFormatted);
                console.log("CHORE COMPLETIONS: " + JSON.stringify(choreCompletions));
                setChoreCompletions(choreCompletions.data);
            } catch (e) {
                console.error(e.message);
            }
        }
        fetchChoreCompletions();
        
    }, []);
    
    const checkStatus = (status) => {
        if (status === "Pending") {
            return (<div>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <button name="approve" type="submit">Approve</button>
                        <button name="reject" type="submit">Reject</button>
                    </form>
                </div>
            </div>)
        } else if (status === "Rejected") {
            return (<div>Waiting For Resubmission</div>)
        } else {
            return (<div>Completed</div>)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const buttonType = e.nativeEvent.submitter.name;
        
        if (buttonType === "approve") {
            // change status to Approved in api call
        } else if (buttonType === "reject") {
            // increase rejection count and changed status to rejected in api call
        }
    }
    
    
    return (
        <div>
            {calendarVisible ? "" : <button onClick={handleCalendarVisibility}>Back to calendar</button>}
            <br/>
            {choreCompletions && choreCompletions.map(cc => (
                <div>
                    <h4>{cc.residentChores.chore.taskName}</h4>
                    {checkStatus(cc.status)}
                </div>
            ))}
        </div>
    )
}

export default ChoreHome;