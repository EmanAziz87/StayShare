import '../styles/navigation.css';
import {Link} from "react-router-dom";

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
            <Link to='/'>Home</Link>
        </nav>
    );
}

export default Navigation;