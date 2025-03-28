import JoinResidenceForm from "./JoinResidenceForm.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import {residenceService, residentChoreService} from "../api/apiCalls.js";
import {dueDatesForAllChores} from "../store/slices/choreDueDatesSlice.js";

const MyResidence = () => {
    const [residence, setResidence] = useState();
    const [userChores, setUserChores] = useState([]);
    const [allChoreDueDates, setAllChoreDueDates] = useState([]);
    const {user} = useAuth();
    
    useEffect(() => {
        const fetchResidenceWithUsers = async () => {
           const residence = await residenceService.getResidence(user.residenceId);
           setResidence(residence.data);

            if (residence.data.users && residence.data.users.length > 0) {
                const choresResponse = await residentChoreService.getAllChoresByResidentId(residence.data.users);
                setUserChores(choresResponse);
            }
        }
        fetchResidenceWithUsers();
    }, [])
    
    useEffect(() => {
        if (userChores && userChores.length > 0) {
            choreDueDatesForTheYear();
        }
    }, [userChores])
    
    

    const choreDueDatesForTheYear = () => {
        let allChoresWithDueDates = []
        for (let j = 0; j < userChores[0].chores.length; j++) {
            const dateTest = userChores[0].chores[j].assignedDate;
            const dateSplit = dateTest.substring(0, 10).split("-");
            const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

            const currentDate = new Date();
            const currentYear = parseInt(currentDate.toLocaleString("Default", {year: "numeric"}), 10);
            const intervalForChore = residence.chores[j].intervalDays;

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
        setAllChoreDueDates(allChoresWithDueDates);
    }
    
    console.log("user:" + JSON.stringify(user));
    console.log("residence: " + JSON.stringify(residence));
    console.log("All Chore Due Dates: " + JSON.stringify(allChoreDueDates));
    return (
        <div>
            <JoinResidenceForm/>
            <h1>{residence && residence.residenceName}</h1>
        </div>
    )
}

export default MyResidence;