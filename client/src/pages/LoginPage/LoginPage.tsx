import React, {useState} from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { AppDispatch } from '../../store/store'
import { loginUser } from '../../store/features/userSlice/userSlice'

const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ username, password })).then((action) => {
            console.log("Login action result:", action);
            if (loginUser.fulfilled.match(action)) {
                const token = action.payload?.token;
                if (!token) {
                    console.error("Login successful but token is undefined.");
                }
                localStorage.setItem('token', token as string);
        
                const organization = action.payload?.user.organization;
                if (organization === "IDF") {
                    navigate('/defense');
                } else {
                    navigate('/attack');
                }
            } else {
                console.error("Login failed", action.error);
            }
        });
        
    };
    

  return (
    <div className='login-container'>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
        </form>
        <p className='switch-auth'>
            Don't have an account? <Link to='/register'>Register here</Link>
        </p>
    </div>
  )
}

export default LoginPage