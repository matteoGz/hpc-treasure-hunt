import { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';

const CreateHintForm = ({ open, handleClose, onSubmit }) => {
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newHint = { number, description, location };
    try {
      await onSubmit(newHint);
      handleClose();
      setNumber('');
      setDescription('');
      setLocation('');
    } catch (err) {
      console.error('Error creating hint:', err);
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Hint</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Hunt Number"
          type="text"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder='Insert a valid number'
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
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Create Hint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateHintForm.propTypes = {
    open: PropTypes.bool.isRequired, 
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CreateHintForm;