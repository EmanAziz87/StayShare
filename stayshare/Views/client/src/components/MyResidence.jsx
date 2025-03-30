import JoinResidenceForm from "./JoinResidenceForm.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import {residenceService, residentChoreService} from "../api/apiCalls.js";
import '../styles/myresidence.css';

const MyResidence = () => {
    const [residence, setResidence] = useState();
    const [userChores, setUserChores] = useState([]);
    const [allChoreDueDates, setAllChoreDueDates] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [skipToday, setSkipToday] = useState(false);
    const {user} = useAuth();
    
    useEffect(() => {
        const fetchResidenceWithUsers = async () => {
           const residence = await residenceService.getResidence(user.residenceId);
           setResidence(residence.data);
           setAllUsers(residence.data.users);

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

    useEffect(() => {
        if (allUsers && allUsers.length > 0) {
            setChoreSkipsForEachResident();
        }
    }, [residence]);
    

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
    
    const nextChoreDue = () => {
        let yetToFindChore = true;
        const dateNow = new Date();
        let numericDay = parseInt(dateNow.toLocaleString("Default", {day: "numeric"}), 10);
        let numericMonth = parseInt(dateNow.toLocaleString("Default", {month: "numeric"}), 10);
        let numericYear = parseInt(dateNow.toLocaleString("Default", {year: "numeric"}), 10);
        const choresFound = [];
        
        
        for (let i = 0; i < 30; i++) {
            let lastDayOfMonth = parseInt(new Date(numericYear, numericMonth, 0).toLocaleString("Default", {day: "numeric"}),10);
            for (let i = 0; i < allChoreDueDates.length; i++) {
                const choreDay = allChoreDueDates[i].choreDays.find(choreDay => {
                    return choreDay.day === numericDay && choreDay.month === numericMonth;
                })
                
                if (choreDay) {
                    choresFound.push({...allChoreDueDates[i], choreDays: choreDay})
                    yetToFindChore = false;
                }
            }
            
            if (!yetToFindChore) break;
            
            if (numericDay < lastDayOfMonth) {
                numericDay++;
            } else {
                numericMonth++;
                numericDay = 1;
                if (numericMonth > 12) {
                    numericYear++;
                    numericMonth = 1;
                }
            }
        }
        let wordsMonthAndDay;
        if (choresFound.length > 0) {
            let {monthWord, dayWord} = convertNumericMonthDayToWord(numericYear, choresFound[0].choreDays.month, choresFound[0].choreDays.day)
            wordsMonthAndDay = {monthWord, dayWord, numericYear}
        }
        return {choresFound, wordsMonthAndDay};
    }
    
    const convertNumericMonthDayToWord = (year, month, day) => {
        const monthWord = new Date(year, month - 1, day).toLocaleString("Default", {month: "long"});
        const dayWord = new Date(year, month - 1, day).toLocaleString("Default", {day: "numeric"});
        return {monthWord, dayWord};
    }
    
    const setChoreSkipsForEachResident = () => {
        const newAllUsers = [];
        let choreSkipsForUser = 0;
        for (let i = 0; i < allUsers.length; i++) {
            for (let j = 0; j < allUsers.length; j++) {
                if (j === i) continue;
                choreSkipsForUser += allUsers[i].totalChoreCount - allUsers[j].totalChoreCount;
            }
            newAllUsers.push({...allUsers[i], choreSkipsAvailable: choreSkipsForUser});
            choreSkipsForUser = 0;
        }
        
        setAllUsers(newAllUsers);
    }
    
    const checkIfYouCanSkipToday = () => {
        if (allUsers && allUsers[0]?.choreSkipsAvailable) {
            let foundUser = allUsers.find(u => u.userName === user.userName);
            if (foundUser) setSkipToday(true);
        }
    }
    
    const nextChore = nextChoreDue();
    
    console.log("??????" + JSON.stringify(residence));
    console.log(":::::::::::" + JSON.stringify(allUsers));
    console.log("USER: " + JSON.stringify(user));
    
    return (
        <div>
            <JoinResidenceForm/>
            <h1>{residence && residence.residenceName}</h1>
            <div className="residents-container">
                {allUsers && allUsers.length > 0 && allUsers.map(user => (
                    <div className="each-resident-container">
                        <div>{user.userName}</div>
                        <div>Chores Completed: {user.totalChoreCount}</div>
                    </div>
                ))}
            </div>
            <div className="chores-container">
                <h2>{nextChore && nextChore.choresFound.length > 0 && (<div>{nextChore.wordsMonthAndDay.monthWord} {nextChore.wordsMonthAndDay.dayWord}, {nextChore.wordsMonthAndDay.numericYear}</div>)}</h2>
                {nextChore.choresFound.map(chore => (
                    <div key={chore.choreId}>
                        <div>
                            <h4>{chore.choreName}</h4>
                            <h4>{chore.choreDays.month}</h4>
                            <h4>{chore.choreDays.day}</h4>
                        </div>
                        <div>
                            <button>Submit For Approval</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            )
}

export default MyResidence;

// NEW IDEA: chores are not assigned by admin. Users can decide who does which chores.
// totalChore count will dictate whether you have to do a chore on a given day.
// example:
/*
    highest total chore count minus total chore count each resident below them one at a time added up will 
    equals the amount of chores the highest total chore count resident can skip.
    
    second-highest total chore count minus total chore count each resident below them one at a time added up will 
    equals the amount of chores the highest total chore count resident can skip.
    
    and so on...
    
    resident 1 tc: 4
    resident 2 tc: 2
    resident 3 tc: 0
    
    resident 1 total skips: (4 - 2) + (4 - 0) === 6
    resident 2 total skips: (2 - 0) === 2
    resident 3 total skips: 0 
    
    if today there are 3 chores to do:
    
    resident 1 does 0 of them
    resident 2 does 1 of them
    resident 3 does 2 of them
 */