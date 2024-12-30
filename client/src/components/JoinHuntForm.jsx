import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const JoinHuntForm = ({ open, handleClose, onSubmit }) => {
    const [joinCode, setJoinCode] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await onSubmit(joinCode);
          handleClose();
          setJoinCode('');
        } catch (error) {
          console.error('Error join hunt:', error);
          const errorMsg = error.response?.data?.message ? error.response.data.message : 'Generic error';
          await alert('Join hunt failed: '+ errorMsg);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Join a hunt</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Hunt code"
                    type="text"
                    fullWidth
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Cancel</Button>
                <Button type="submit" color="warning" variant="contained" onClick={handleSubmit}>Join hunt</Button>
            </DialogActions>
    </Dialog>
    )
}

JoinHuntForm.propTypes = {
    open: PropTypes.bool.isRequired, 
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default JoinHuntForm;