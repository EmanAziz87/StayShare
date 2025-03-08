import '../styles/navigation.css';
import {Link} from "react-router-dom";


const Navigation = () => {
    return (
        <nav id={"navigation-bar"}>
            <Link to='/'>Home</Link>
        </nav>
    );
}

export default Navigation;