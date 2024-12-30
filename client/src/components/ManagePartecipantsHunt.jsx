import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
} from '@mui/material';
import axios from '../services/axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from 'react-icons/cg';
import { updateHunt } from '../services/huntServices';

const ManagePartecipantsHunt = ({ open, onClose, partecipants, huntId }) => {
    const [usersList, setUsersList] = useState([]);
    const [selectedPartecipants, setSelectedpartecipants] = useState([]);
    
    useEffect(() => {
        setSelectedpartecipants(partecipants ? partecipants : []);
        axios('http://localhost:8080/api/users')
        .then(response => {
            setUsersList(response.data);
        })
        .catch(error => {
            console.error('Error loading users: ', error);
        });
    }, [partecipants]);

    const handleCheckboxChange = (userId) => {
        if(selectedPartecipants.includes(userId))
            setSelectedpartecipants(selectedPartecipants.filter((id) => id !== userId));
        else
            setSelectedpartecipants([...selectedPartecipants, userId]);
      };

    const handleSave = async () => {
        const updatedHuntData = {
            partecipants: selectedPartecipants,
        }; 
        try {
            await updateHunt(huntId, updatedHuntData);
            await onClose();
        } catch (error) {
            console.error('Error updating hunt: ', error);
            const errorMsg = error.response?.data?.message ? error.response.data.message : 'Generic error';
            await alert('Update hunt failed: '+ errorMsg);
        } finally{
            window.location.reload();
        }
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Manage partecipants</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select users can partecipate that hunt:
                </DialogContentText>
                <List>
                {usersList.map((user) => (
                    <ListItem key={user._id}>
                        <ListItemIcon>
                            <CgProfile size={24}/>
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                        <Checkbox 
                            onChange={() => handleCheckboxChange(user._id)} 
                            checked={selectedPartecipants.includes(user._id)} 
                        />
                    </ListItem>
                ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose} startIcon={<RxCross2 />}>Cancel</Button>
                <Button variant="contained" color="success" startIcon={<IoSaveOutline />} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

ManagePartecipantsHunt.propTypes = {
    open: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    partecipants: PropTypes.array,
    huntId: PropTypes.string.isRequired
};

export default ManagePartecipantsHunt;