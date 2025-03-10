import '../styles/navigation.css';
import {Link} from "react-router-dom";
import Logout from "./Logout.jsx";


const Navigation = () => {
    return (
        <nav id={"navigation-bar"}>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Logout />
        </nav>
    );
}

export default Navigation;