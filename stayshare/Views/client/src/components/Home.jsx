import {useEffect, useState} from "react";
import {choreService} from "../api/apiCalls.js";

const Home = () => {
    const [chores, setChores] = useState(null);
    const [error, setError] = useState('no error');

    useEffect(() => {
        choreService.getAllChores()
            .then((response) => setChores(response.data))
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
                        <br/>
                    </div>
                )
            }): "error grabbing chores"}</div>
            
        </div>
    );
}

export default Home;