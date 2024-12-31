import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { util } from '../utils/util';
import { GiPirateSkull } from "react-icons/gi";
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined);

    useEffect(() => {
        const isUserAuthenticated = util.isAuthenticated();
        if(isUserAuthenticated)
            setUsername(sessionStorage.getItem('username'));
      }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <GiPirateSkull size={32} /> 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }} onClick={() => window.open('https://github.com/matteognz')}>
                    Treasure Hunt
                </Typography>
                { username ? (
                    <>
                    <Typography variant="body1" marginRight={1}>Benvenuto, {username}!</Typography>
                    <CgProfile size={32}/>
                    </>
                ) : (
                    <div>
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        <Button color="inherit" onClick={() => navigate('/registration')}>Registration</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};