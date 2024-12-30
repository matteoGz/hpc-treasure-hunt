import { Button, Grid, Typography } from "@mui/material";
import { IoMdLogIn } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { SiAdblock } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import noAuthGif from "../assets/noauth.webp";
import "../assets/custom.css";
import { useEffect } from "react";
import { util } from "../utils/util";

export default function AuthPage() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(util.isAuthenticated())
            navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={1}> 
            <Grid item xs={12} sm={8} md={6}> 
                <Grid container spacing={2} justifyContent="center"> 
                    <Grid item xs={12} align="center">
                        <SiAdblock color="#c3170C" size={48} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                        Oops...You need to be authenticated
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={"center"}>
                        <img src={noAuthGif} alt="No auth gif"></img>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" fullWidth startIcon={<IoMdLogIn />} onClick={() => navigate('/login')}>
                        LOGIN
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="outlined" color="secondary" fullWidth startIcon={<ImProfile />} onClick={() => navigate('/registration')}>
                        REGISTRATION
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
  );
}