import { useState } from "react";
import axios from 'axios';
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Cookies from 'js-cookie';
import { IoMdLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { util } from "../utils/util";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pswVisible, setPswVisible] = useState(false);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(util.getBackendUrl()+'/auth/login', { username, password });
            if(response?.data?.token && response?.data?.uid){
                console.log(response.data.token, response.data.uid);
                await sessionStorage.setItem('username', username);
                await Cookies.set('authToken', response.data.token, { expires: 7, sameSite: 'strict', secure: true });
                await sessionStorage.setItem('uid', response.data.uid);
                await navigate('/');
                await alert("Login successfull...Welcome pirate "+ username);
                await window.location.reload();
            } else console.warn("JWT token not found")
        } catch (error) {
            console.error('Login error:', error);
            const errorMsg = error?.response?.data?.message ? error.response.data.message : "Generic error";
            await alert("Login failed: "+ errorMsg);
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
            <Button type="submit" variant="contained" color="primary" startIcon={<IoMdLogIn />}>
                LOGIN
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<ImProfile />} onClick={() => navigate('/registration')}>
                GO TO REGISTRATION
            </Button>
        </form>
    );
}