import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {residenceService} from "../api/apiCalls.js";
import ChoreBox from "./ChoreBox.jsx";
import TenantBox from "./TenantBox.jsx";
import CurrentWeekBox from "./CurrentWeekBox.jsx";
import "../styles/residenceHome.css";

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
    
    console.log("RESIDENCE" + JSON.stringify(residence));
    return (
        <div>
            <h1 className="residence-home-header">Residence Name: {residence.residenceName}</h1>
            <div className="residence-home-content-container">
                <TenantBox residence={residence}/>
                <ChoreBox residence={residence}/>
                <CurrentWeekBox residence={residence}/>
            </div>
            
        </div>
    );
}

export default ResidenceHome;