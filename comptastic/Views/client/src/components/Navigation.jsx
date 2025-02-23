import { testService } from '../api/apiCalls.js';
import '../styles/navigation.css';
import {useEffect, useState} from 'react';

const Navigation = () => {
    /*const [message, setMessage] = useState('no message');
    const [error, setError] = useState('no error');
    useEffect(() => {
        testService.test
            .then((data) => setMessage(data.message))
            .catch(error => setError(error));
    }, []);*/
    return (
        <nav id={"navigation-bar"}>
            <a href="">Build Tool</a>
            <br/>
            <a href="">Community</a>
        </nav>
    );
}

export default Navigation;