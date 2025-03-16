import '../styles/choreBox.css';
import {choreService} from "../api/apiCalls.js";
import {useState} from "react";
const ChoreBox = ({residence}) => {
    const [chores, setChores] = useState([...residence.chores ? residence.chores : []]);
    const [newChore, setChore] = useState({taskName: '', intervalDays: 0, residenceId: residence.id});
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setChore(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const choreToAdd = {
            ...newChore,
            intervalDays: parseInt(newChore.intervalDays, 10)
        }

        try {
            const response = await choreService.createChore(choreToAdd);
            console.log("Success response:", response);
        } catch (error) {
            console.error("Error details:", error.response?.data);
        }
        
        setChores([...chores, choreToAdd]);
        setChore({taskName: '', intervalDays: 0, residenceId: residence.id});
    }
    
    return (
        <div className="chore-box-container">
            {chores ? chores.map((chore) => (
            <div key={chore.id}>
                        <div>{chore.taskName}</div>
                        <br />
                    </div>
                )) : 'No chores in this residence'}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Add Chore -> </label>
                    <input name="taskName" type="text" placeholder="Chore Name" onChange={handleChange} value={newChore.taskName}/>
                </div>
                <div>
                    <label htmlFor="">Interval Days -> </label>
                    <input name="intervalDays" type="number" placeholder="Interval Days" onChange={handleChange} value={newChore.intervalDays}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default ChoreBox;