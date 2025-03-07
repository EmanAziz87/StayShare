import {useEffect, useState} from "react";
import {choreService} from "../api/apiCalls.js";

const Home = () => {
    const [chores, setChores] = useState(null);
    const [error, setError] = useState('no error');

    useEffect(() => {
        choreService.getChore
            .then((data) => setChores(data))
            .catch(error => setError(error));
    }, []);
    
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
                        <div>{chore.comment}</div>
                    </div>
                )
            }): "error grabbing chores"}</div>
        </div>
    );
}

export default Home;