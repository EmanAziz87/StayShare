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
                console.log("::::::::::::::" + JSON.stringify(allUsers));
                
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