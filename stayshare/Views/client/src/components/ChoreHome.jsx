import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {choreCompletionService, residenceService, residentChoreService} from "../api/apiCalls.js";
import {useSelector} from "react-redux";


const ChoreHome = ({handleCalendarVisibility, calendarVisible, choreId, numericIndex}) => {
    const [userForSelectedChore, setUserForSelectedChore] = useState();
    const {year, month,day} = useParams();
    
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await residentChoreService.getAllUsersByChoreId(choreId);
                allUsers.sort((a, b) => a.user.userName > b.user.userName);
                allUsers.sort((a, b) => a.completionCount > b.completionCount);
                
                if (numericIndex + 1 > allUsers.length) {
                    const adjustedIndex = (numericIndex % allUsers.length);
                    numericIndex = adjustedIndex;
                    console.log("************" + numericIndex);
                }
                
                const nextUpResidentChoreId = allUsers[numericIndex].id;
                console.log("Numeric index:" + numericIndex);
                
                console.log(`User Numeric index ${numericIndex}: ` + JSON.stringify(allUsers[numericIndex]));
                setUserForSelectedChore(allUsers[numericIndex])
                /*const choreDate = [year, month, day].join("-");
                await choreCompletionService.getAChoreCompletionRecordByDate(nextUpResidentChoreId, choreDate);*/
            } catch (e) {
                console.error(e.message);
            }
        }
        fetchUsers();
        
    }, []);
    
    
    return (
        <div>
            {calendarVisible ? "" : <button onClick={handleCalendarVisibility}>Back to calendar</button>}
            <br/>
            <h1>{userForSelectedChore && userForSelectedChore.user.userName}</h1>
        </div>
    )
}

export default ChoreHome;