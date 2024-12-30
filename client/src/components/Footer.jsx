import { BottomNavigation, BottomNavigationAction, Box, styled } from "@mui/material";
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiTreasureChestDuotone } from "react-icons/pi";
import { RiTreasureMapLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
}));

export default function Footer() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledBottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction label="Home" icon={<IoHomeOutline size={32}/>} onClick={() => navigate('/')}/>
                <BottomNavigationAction label="Hunts" icon={<PiTreasureChestDuotone size={32}/>} onClick={() => navigate('/hunts')}/>
                <BottomNavigationAction label="Hints" icon={<RiTreasureMapLine size={32}/>} onClick={() => navigate('/hints')}/>
            </StyledBottomNavigation>
        </Box>
  );
};