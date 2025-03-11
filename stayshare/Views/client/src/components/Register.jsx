import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext.jsx";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            const userData = {
                email: formData.email,
                password: formData.password
            };

            const response = await register(userData);

            if (response.status === 200) {
                navigate('/login');
            } else {
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div>
                <h2>Create your account</h2>
            </div>

            {error && (
                <div role="alert">
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="isAdmin">Admin</label>
                        <input
                            id="isAdmin"
                            type="checkbox"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;