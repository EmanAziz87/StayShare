import '../styles/navigation.css';
import {Link} from "react-router-dom";
import Logout from "./Logout.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";



const Navigation = () => {
    
    const { user } = useAuth();
    console.log("user in nav:" + JSON.stringify(user));
    return (
        <nav id={"navigation-bar"}>
            <Link to='/'>Home</Link>
            {!user && (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )}
            {user?.roles[0] === "Admin" ? <Link to='/residences'>Residences</Link>: ''}
            <Logout />
        </nav>
    );
}

export default Navigation;