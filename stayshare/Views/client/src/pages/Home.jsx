import {useEffect, useState} from "react";
import {choreService} from "../api/apiCalls.js";

const Home = () => {
    const [chores, setChores] = useState(null);
    const [error, setError] = useState('no error');

    useEffect(() => {
        choreService.getChore()
            .then((data) => setChores(data))
            .catch(error => setError(error));
    }, []);
    
    const handleSubmit = async (chore, e) => {
        e.preventDefault();
        const newChore = {
            ...chore,
            completed: true
        }
        await choreService.updateChore(chore.id, newChore)
        
        setChores(prevChores =>
            prevChores.map(c =>
                c.id === chore.id ? { ...c, completed: true } : c
            )
        )

    }
    
    return (
        <div>
            <h1>StayShare</h1>
            <div>{chores ? chores.map((chore) => {
                return (
                    <div key={chore.id}>
                        <div>{chore.taskName}</div>
                        <div>{chore.startDate}</div>
                        <div>{chore.completeBy}</div>
                        <div>{chore.completed ? "Chore is Completed" : "Requires Attention"}</div>
                        <form onSubmit={(e) => handleSubmit(chore, e)}><button type="submit">Complete</button></form>
                        <div>{chore.comment}</div>
                        <br/>
                    </div>
                )
            }): "error grabbing chores"}</div>
            
        </div>
    );
}

export default Home;