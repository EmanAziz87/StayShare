import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { residenceService } from '../api/apiCalls';
import {useAuth} from "../contexts/AuthContext.jsx";

const ResidenceForm = (props) => {
    const {user} = useAuth();
    
    const [residence, setResidence] = useState({
        residenceName: '',
        passcode: '',
        adminEmail: user.userName
    });
    
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResidence(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            await residenceService.createResidence(residence);
            setResidence((prev) => ({ ...prev, residenceName: '', passcode: ''}));
            if (props.onResidenceAdded) {
                props.onResidenceAdded();
            }
            navigate('/residences');
        } catch (err) {
            setError('Failed to create residence');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New Residence</h2>

            {error && (
                <div role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="residenceName">Residence Name</label>
                    <input
                        type="text"
                        id="residenceName"
                        name="residenceName"
                        value={residence.residenceName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passCode">Residence Passcode</label>
                    <input
                        type="password"
                        id="passcode"
                        name="passcode"
                        value={residence.passcode}
                        onChange={handleChange}
                        required
                    />
                        
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Residence'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResidenceForm;