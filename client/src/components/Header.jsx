import { AppBar, Toolbar, Typography, Button, MenuItem, Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import { util } from '../utils/util';
import { GiPirateSkull } from "react-icons/gi";
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined);
    const [isAuth, setIsAuth] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const isUserAuthenticated = util.isAuthenticated();
        const userLogged = sessionStorage.getItem('username'); 
        if(isUserAuthenticated){
            if(userLogged){
                setIsAuth(true);
                setUsername(sessionStorage.getItem('username'));
            } else{
                setIsAuth(true);
                sessionStorage.setItem('username', 'pirata');
                setUsername('pirata');
                alert('Username missing in sessionStorage...Consider redirecting to login, set default pirata');
            }
        } else setIsAuth(false);
    }, []);

    const handleLogout = async () => {
        await handleClose();
        await sessionStorage.setItem('username', undefined);
        await Cookies.remove('authToken');
        window.location.reload();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <GiPirateSkull size={32} /> 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }} onClick={() => window.open('https://github.com/matteognz')}>
                    Treasure Hunt
                </Typography>
                { isAuth && username ? (
                    <>
                    <Typography variant="body1" marginRight={1}>Benvenuto, {username}!</Typography>
                    <CgProfile size={32} aria-controls="logout-menu" aria-haspopup="true" onClick={handleClick} />
                    <Menu
                        id="logout-menu"
                        keepMounted
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
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