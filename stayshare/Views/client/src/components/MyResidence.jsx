import JoinResidenceForm from "./JoinResidenceForm.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import {choreCompletionService, residenceService, residentChoreService} from "../api/apiCalls.js";
import '../styles/myresidence.css';

const MyResidence = () => {
    const [residence, setResidence] = useState();
    const [userChores, setUserChores] = useState(null);
    const [allChoreDueDates, setAllChoreDueDates] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [currentChoresDue, setCurrentChoresDue] = useState(null);
    const {user} = useAuth();


    useEffect(() => {
        const fetchResidenceWithUsers = async () => {
           const residence = await residenceService.getResidence(user.residenceId);
           setResidence(residence.data);
           setAllUsers(residence.data.users);

            if (residence.data.users && residence.data.users.length > 0) {
                const choresResponse = await residentChoreService.getAllChoresByResidentId(residence.data.users);
                console.log("CHORES RESPONSE: " + JSON.stringify(choresResponse));
                const allChoreDueDates = choreDueDatesForTheYear(choresResponse);
                setUserChores(choresResponse);
                setAllChoreDueDates(allChoreDueDates);
            }
        }
        
        fetchResidenceWithUsers();
    }, []);

    useEffect(() => {
        if (allChoreDueDates && allChoreDueDates.length > 0) {
            const choresDue = choresDueNext();
            setCurrentChoresDue(choresDue);
        }
    }, [allChoreDueDates]);
    
    const choreDueDatesForTheYear = (userChores) => {
        if (!userChores || userChores[0].chores === undefined) {
            console.warn("passed in parameter is either undefined or has missing properties");
            return null;
        }
        
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
            const choreInfoWithDueDates = {choreName: userChores[0].chores[j].taskName, choreId: userChores[0].chores[j].choreId, intervalDays: userChores[0].chores[j].intervalDays, choreDays: allChoreDueDatesForYear};
            allChoresWithDueDates.push(choreInfoWithDueDates);
            allChoreDueDatesForYear = [];
        }
        return allChoresWithDueDates;
    }
    
    const choresDueNext = () => {
        
        const choresToComplete = [];
        
        for (let i = 0; i < allChoreDueDates.length; i++) {
            const dateNow = new Date();
            const choreInterval = allChoreDueDates[i].intervalDays;
            for (let j = 0; j < choreInterval; j++) {
                const currentDay = dateNow.getDate();
                const currentMonth = dateNow.getMonth() + 1;
                const foundChore = allChoreDueDates[i].choreDays.find(day => {
                    return currentMonth === day.month && day.day === currentDay;
                });
                
                if (foundChore) {
                    const date = new Date(dateNow.getFullYear(), foundChore.month - 1, foundChore.day)
                    date.setDate(date.getDate() + choreInterval - 1);
                    const daysLeftDate = new Date();
                    daysLeftDate.setDate(date.getDate() - dateNow.getDate());
                    const choreObj = {
                        ...allChoreDueDates[i], 
                        choreDays: foundChore, 
                        daysLeft: daysLeftDate.getDate()
                    }
                    
                    choresToComplete.push(choreObj);
                    break;
                }
                
                dateNow.setDate(dateNow.getDate() - 1);
            }
            
        }
        console.log("----------------------:" + JSON.stringify(choresToComplete));
        return choresToComplete;
    }
    
    
   return (<div>
       hello
       {currentChoresDue && currentChoresDue.map(chore => {
           return (
               <div>
                   <div>{chore.choreName}</div> 
                   <div>Month: {chore.choreDays.month} Day: {chore.choreDays.day}</div>
                   <div>Days Left: {chore.daysLeft}</div>
                   <br/>
               </div>
               
           )
       })}
   </div>)
}

export default MyResidence;

