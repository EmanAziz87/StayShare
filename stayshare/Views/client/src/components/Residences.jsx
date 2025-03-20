import {residenceService} from "../api/apiCalls.js";
import ResidenceForm from "./ResidenceForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Residences = () => {
    const [residences, setResidences] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    const handleResidenceAdded = () => {
        setRefresh(prev => prev + 1);
    };
    useEffect(() => {
        const fetchResidences = async () => {
            try {
                const response = await residenceService.getAllResidences();
                setResidences(response.data);
            } catch (error) {
                console.error("Error fetching residences:", error);
            }
        };

        fetchResidences();
    }, [refresh]);

    const handleResidenceClick = (id) => {
        navigate(`/residences/residence/${id}`);
    };
    
    const handleDelete = async (id) => {
        try {
            await residenceService.deleteResidence(id);
            setResidences(residences.filter(residence => residence.id !== id));
        } catch (error) {
            console.error("Error deleting residence:", error);
        }
    }

    console.log("residences response: ", residences);


    return (
        <div>
            <ResidenceForm onResidenceAdded={handleResidenceAdded}/>
            {residences && residences?.map((residence) => {
                return (
                    <div key={residence.id}>
                        <div style={{ cursor: 'pointer' }} onClick={() => handleResidenceClick(residence.id)}>{residence.residenceName}</div>
                        <button onClick={() => handleDelete(residence.id)}>Delete</button>
                        <br />
                    </div>
                )})}
        </div>
    );
}

export default Residences;