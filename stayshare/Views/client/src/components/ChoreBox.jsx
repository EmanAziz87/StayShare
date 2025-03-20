import '../styles/choreBox.css';
import {choreService} from "../api/apiCalls.js";
import {useEffect, useState} from "react";
const ChoreBox = ({residence}) => {
    const [chores, setChores] = useState();
    const [newChore, setChore] = useState({taskName: '', intervalDays: 0, residenceId: 0});
    
    useEffect(() => {
        if (residence?.chores) {
            setChores(residence.chores);
        }
        
    }, [residence?.chores])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setChore(prev => ({
            ...prev,
            [name]: value
        }))
    }
    console.log("________residenceUsers:" + JSON.stringify(residence?.users));
    const handleSubmit = async (e) => {
        e.preventDefault();
        const choreToAdd = {
            ...newChore,
            intervalDays: parseInt(newChore.intervalDays, 10),
            residenceId: residence.id,
        }

        try {
            const response = await choreService.createChore(choreToAdd, residence.users);
            console.log("Success response:", response);
        } catch (error) {
            console.error("Error details:", error.response?.data);
        }
        
        setChores([...chores, choreToAdd]);
        setChore({taskName: '', intervalDays: 0, residenceId: residence.id});
    }
    
    return (
        <div className="chore-box-container">
            {chores?.length ? chores.map((chore) => (
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