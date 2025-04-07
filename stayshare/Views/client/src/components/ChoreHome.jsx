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

    useEffect(() => {
        
    }, [choreCompletions]);
    
    const checkStatus = (status, cc) => {
        if (status === "Pending") {
            return (<div>
                <div>
                    <form onSubmit={(e) => handleSubmit(e, cc)}>
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
    
    const handleSubmit = async (e, cc) => {
        e.preventDefault();
        const buttonType = e.nativeEvent.submitter.name;
        
        let newChoreCompletionObj = {
            id: cc.id,
            status: cc.status,
            rejectionCount: cc.rejectionCount
        }
        console.log("NEWCHORECOMPLETION: " + JSON.stringify(newChoreCompletionObj));
        
        try {
            if (buttonType === "approve") {
                newChoreCompletionObj = {...newChoreCompletionObj, status: "Approved", retired: true};
                await choreCompletionService.updateChoreCompletion(newChoreCompletionObj);
            } else if (buttonType === "reject") {
                newChoreCompletionObj = {...newChoreCompletionObj, status: "Rejected", rejectionCount: cc.rejectionCount + 1};
                await choreCompletionService.updateChoreCompletion(newChoreCompletionObj);
            }
            const newChoreCompletions = choreCompletions.map((cc) => cc.id === newChoreCompletionObj.id ? {...cc, ...newChoreCompletionObj} : cc);
            setChoreCompletions(newChoreCompletions);
        } catch (e) {
            console.error("An error occured: " + e.message);
        }
    }
    
    
    return (
        <div>
            {calendarVisible ? "" : <button onClick={handleCalendarVisibility}>Back to calendar</button>}
            <br/>
            {choreCompletions && choreCompletions.length > 0 && choreCompletions.map(cc => (
                <div key={cc.id}>
                    <h4>{cc.residentChores.chore.taskName}</h4>
                    {checkStatus(cc.status, cc)}
                </div>
            ))}
        </div>
    )
}

export default ChoreHome;