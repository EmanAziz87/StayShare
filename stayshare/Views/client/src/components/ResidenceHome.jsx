import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {residenceService} from "../api/apiCalls.js";

const ResidenceHome = () => {
    const [residence, setResidence] = useState({});
    const {id} = useParams();
    
    useEffect(() => {
        const fetchResidence = async () => {
            try {
                const response = await residenceService.getResidence(id);
                setResidence(response.data);
            } catch (error) {
                console.error("Error fetching residence:", error);
            }
        };
        
        fetchResidence()
        
    },[]);
    
    return (
        <div>
            <h1>Residence Name: {residence.residenceName}</h1>
            {residence.users?.length ? residence.users.map((user) => (
                <div key={user.id}>
                    <div>{user.userName}</div>
                    <br />
                </div>
            )) : 'No users in this residence'}
        </div>
    );
}

export default ResidenceHome;