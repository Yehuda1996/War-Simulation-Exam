import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser  } from '../../store/features/userSlice/userSlice'
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import './RegisterPage.css'

const RegisterComponent = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [area, setArea] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            username,
            password,
            organization,
            ...(organization === "IDF" && { area })
        };

        dispatch(registerUser (userData));
        navigate('/login');
    };

    return (
        <div className='register-container'>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                >
                    <option value="">Select Organization</option>
                    <option value="IDF">IDF</option>
                    <option value="Hezbollah">Hezbollah</option>
                    <option value="Hamas">Hamas</option>
                    <option value="IRCG">IRCG</option>
                    <option value="Houthis">Houthis</option>
                </select>

                {organization === "IDF" && (
                    <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    >
                        <option value="">Select Area</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="Center">Center</option>
                        <option value="West Bank">West Bank</option>
                    </select>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterComponent;