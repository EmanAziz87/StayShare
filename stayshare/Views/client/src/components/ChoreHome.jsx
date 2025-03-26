import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {residentChoreService} from "../api/apiCalls.js";


const ChoreHome = () => {
    const [allUsersForChore, setAllUsersForChore] = useState([]);
    const {choreId} = useParams();
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await residentChoreService.getAllUsersByChoreId(choreId);
                allUsers.sort((a, b) => a.user.userName > b.user.userName);
                allUsersForChore.sort((a, b) => a.completionCount > b.completionCount);

                setAllUsersForChore(allUsers);
            } catch (e) {
                console.error(e.message);
            }
        }
        fetchUsers();
        
    }, []);
    
    console.log("ALL USERS FOR CHORE: " + JSON.stringify(allUsersForChore));
    
    return (
        <div>
            {allUsersForChore && allUsersForChore.length > 0 && allUsersForChore[0].user.userName}
        </div>
    )
}

export default ChoreHome;