import {useState} from "react";
import {residenceService} from "../api/apiCalls.js";
import {useAuth} from "../contexts/AuthContext.jsx";
const JoinResidenceForm = () => {
    const [passcode, setPasscode] = useState('');
    const {user} = useAuth();
    
    const handleChange = (e) => {
        const { value } = e.target;
        setPasscode(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await residenceService.addUserToResidence(user.userName, passcode);
            setPasscode('');
        } catch(e) {
            throw e;
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="passcode">Residence Passcode:</label>
                    <input
                        type="text"
                        id="join-passcode"
                        name="passcode"
                        value={passcode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Join</button>
                </div>
            </form>
        </div>
    )
}

export default JoinResidenceForm;
