import { useEffect, useState } from "react";
import { createHunt, getAllHunts, joinHuntByJoinCode } from "../services/huntServices";
import { Grid, CircularProgress, Button, Box } from '@mui/material';
import Hunt from "../components/Hunt";
import { IoAddCircleOutline } from "react-icons/io5";
import CreateHuntForm from "../components/CreateHuntForm";
import axios from "../services/axios";
import { IoEnterOutline } from "react-icons/io5";
import JoinHuntForm from "../components/JoinHuntForm";
import { util } from "../utils/util";

export default function HuntsPage() {
  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const [users, setUsers] = useState([]);
  const userLogged = sessionStorage.getItem('username');

  const [openJoinHunt, setOpenJoinHunt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        axios(util.getBackendUrl()+'/users')
          .then(async (response) => {
            setUsers(response.data);
            const data = await getAllHunts();
            setHunts(data);
          })
          .catch(error => {
            console.error('Error loading users: ', error);
            setError(error.response?.message ? error.response.message : 'Generic error');
            setIsLoading(false);
          });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateHunt = async (newHuntData) => {
    try {
      const createdHunt = await createHunt(newHuntData);
      setHunts([...hunts, createdHunt]);
    } catch (err) {
      console.error('Error creating hunt:', err);
      const errorMsg = err.response?.data?.message ? err.response.data.message : 'Generic error'; 
      await alert('Creating hunt failed: '+ errorMsg);
    }
  };

  const handleJoinHunt = async (joinCode) => {
    try {
      const userId = users?.filter(user => user.username === userLogged)[0]?._id;
      await joinHuntByJoinCode(joinCode, {userId: userId});
    } catch (err) {
      console.error('Error join hunt:', err);
      const errorMsg = err.response?.data?.message ? err.response.data.message : 'Generic error'; 
      await alert('Join hunt failed: '+ errorMsg);
    } finally {
      window.location.reload();
    }
  }

  return (
    <Box marginTop={1}>
      {isLoading && <CircularProgress />}
      {error && <p>Error loading hunts: {error}</p>}
      <Grid container spacing={2}>
        <Grid item xs={6} textAlign={"center"}>
          <Button color="success" variant="contained" startIcon={<IoAddCircleOutline/>} onClick={() => setOpenCreateForm(true)} disabled={users.filter(user => user.username === userLogged)[0]?.role !== 'admin'}>Create hunt</Button>
        </Grid>
        <Grid item xs={6} textAlign={"center"}>
          <Button color="warning" variant="contained" startIcon={<IoEnterOutline/>} onClick={() => setOpenJoinHunt(true)}>Join a hunt</Button>
        </Grid>
        {hunts.map((hunt) => (
          <Grid item xs={12} sm={6} md={4} key={hunt._id}>
          { hunt.partecipants?.includes(users?.filter(user => user.username === userLogged)[0]?._id) && 
            <Hunt hunt={hunt} usersList={users} userLogged={userLogged}/>
          }
          </Grid>
        ))}
      </Grid>
      <CreateHuntForm
        open={openCreateForm}
        handleClose={() => setOpenCreateForm(false)}
        onSubmit={handleCreateHunt}
      />
      <JoinHuntForm
        open={openJoinHunt}
        handleClose={() => setOpenJoinHunt(false)}
        onSubmit={handleJoinHunt}
      />
    </Box>
  );
}
