import { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material/';
import axios from 'axios';
import { ImProfile } from 'react-icons/im';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { util } from '../utils/util';

export default function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pswVisible, setPswVisible] = useState(false);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(util.getBackendUrl()+'/auth/register', { username, email, password });
            console.log('Registration successful:', response.data);
            try {
                const response = await axios.post(util.getBackendUrl()+'/auth/login', { username, password });
                if(response?.data?.token && response?.data?.uid){
                    console.log(response.data.token, response.data.uid);
                    await sessionStorage.setItem('username', username )
                    await Cookies.set('authToken', response.data.token, { expires: 7, sameSite: 'strict', secure: true });
                    await sessionStorage.setItem('uid', response.data.uid);
                    await navigate('/');
                    await alert("Registration successfull...Welcome pirate "+ username);
                    await window.location.reload();
                } else console.warn("JWT token not found")
            } catch (error) {
                console.error('Registration login error:', error);
                const errorMsg = error?.response?.data?.message ? error.response.data.message : "Generic error";
                await alert("Registration failed: "+ errorMsg);
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMsg = error?.response?.data?.message ? error.response.data.message : "Generic error";
            await alert("Registration failed: "+ errorMsg);
        }
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                fullWidth
                required
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type={pswVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setPswVisible(!pswVisible)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                            { pswVisible ? <MdVisibilityOff /> : <MdVisibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button type="submit" variant="outlined" color="secondary" startIcon={<ImProfile />}>
                REGISTRATION
            </Button>
        </form>
    );
}