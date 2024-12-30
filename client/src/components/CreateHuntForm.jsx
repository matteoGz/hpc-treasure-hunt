import { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';

const CreateHuntForm = ({ open, handleClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const creator = sessionStorage.getItem('uid');
  const partecipants = [creator];
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newHunt = { title, description, creator, location, partecipants };
    try {
      await onSubmit(newHunt);
      handleClose();
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (err) {
      console.error('Error creating hunt:', err);
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Hunt</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Hunt Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          multiline
          fullWidth
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Create Hunt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateHuntForm.propTypes = {
    open: PropTypes.bool.isRequired, 
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CreateHuntForm;