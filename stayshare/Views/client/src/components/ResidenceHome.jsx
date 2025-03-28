import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {residenceService, residentChoreService} from "../api/apiCalls.js";
import ChoreBox from "./ChoreBox.jsx";
import TenantBox from "./TenantBox.jsx";
import CurrentWeekBox from "./CurrentWeekBox.jsx";
import "../styles/residenceHome.css";

const ResidenceHome = () => {
    const [residence, setResidence] = useState({});
    const [userChores, setUserChores] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const fetchResidence = async () => {
            try {
                const residenceResponse = await residenceService.getResidence(id);
                setResidence(residenceResponse.data);
                
                if (residenceResponse.data.users && residenceResponse.data.users.length > 0) {
                    const choresResponse = await residentChoreService.getAllChoresByResidentId(residenceResponse.data.users);
                    setUserChores(choresResponse);
                }
            } catch (error) {
                console.error("Error fetching residence:", error);
            }
        };
        fetchResidence()
    },[]);
    
    return (
        <div>
            <h1 className="residence-home-header">Residence Name: {residence.residenceName}</h1>
            <div className="residence-home-content-container">
                <TenantBox residence={residence}/>
                <ChoreBox residence={residence}/>
                {userChores && userChores.length > 0 && (<CurrentWeekBox residence={residence} userChores={userChores}/>)}
                <Link to={`/residences/residence/${id}/calendar`}>View Calendar</Link>
            </div>
        </div>
    );
}

export default ResidenceHome;