import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GiTreasureMap } from "react-icons/gi";
import { IoSettings } from 'react-icons/io5';
import ManagePartecipantsHunt from './ManagePartecipantsHunt';
import { useNavigate } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';

const Hunt = ({ hunt, usersList, userLogged }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(!open);
    
    return (
        <Card sx={{ minWidth: 275 }} elevation={5}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center"> 
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        <GiTreasureMap color='#CDA434' style={{marginRight:5}}/>{hunt.title}
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                        Codice: {hunt.code} 
                    </Typography>
                </Box>
                <Typography color="text.secondary">
                    Description: {hunt.description}
                </Typography>
                <Typography color="text.secondary">
                    Location: {hunt.location}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleOpenModal} disabled={usersList.filter(user => user.username === userLogged)[0]?.role !== 'admin'}>
                        <IoSettings />
                    </IconButton>
                    <IconButton onClick={() => navigate('/hints/'+hunt._id)}>
                        <MdVisibility color='#3f51b5'/>
                    </IconButton>
                </Box>
            </CardContent>
            <ManagePartecipantsHunt 
                open={open} 
                onClose={() => setOpen(false)}
                partecipants={hunt.partecipants}
                huntId={hunt._id}    
            />
        </Card>
    );
};

Hunt.propTypes = {
    hunt: PropTypes.object.isRequired,
    usersList: PropTypes.array.isRequired,
    userLogged: PropTypes.string.isRequired
};

export default Hunt;