import {sampleUserChores} from "./Sample_choreDueDatesForYear.js";

export const choreDueDatesForTheYear = (userChores) => {
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