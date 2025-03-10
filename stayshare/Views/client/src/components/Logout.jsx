import {useAuth} from "../contexts/AuthContext.jsx";


const Logout = () => {
    const { logout, user } = useAuth();
    
    const handleLogout = async (e) => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>{user ? <button onClick={handleLogout}>Logout</button> : ''}</div>
    );
}

export default Logout;