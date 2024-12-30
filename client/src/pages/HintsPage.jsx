import { useEffect, useState } from "react";
import { getHuntById } from "../services/huntServices";
import { Grid, CircularProgress, Typography, Box, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import Hint from "../components/Hint";
import axios from "../services/axios";
import { createHint, getHintByHuntIdAndHintNumber, getHintsByHuntId } from "../services/hintServices";
import { SiAdblock } from "react-icons/si";
import { IoAddCircleOutline, IoClose, IoQrCodeOutline } from "react-icons/io5";
import CreateHintForm from "../components/CreateHintForm";
import QRCodeGenerator from "../components/QrCodeGenerator";
import { util } from "../utils/util";

export default function HintsPage() {
  const [hunt, setHunt] = useState(null);
  const [hints, setHints] = useState([]);
  const [hintDetails, setHintDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const [users, setUsers] = useState([]);
  const userLogged = sessionStorage.getItem('username');
  const [openGenerator, setOpenGenerator] = useState(false);

  const huntId = window.location.pathname.split("/")[2];
  const hintNumber = window.location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        axios(util.getBackendUrl()+'/users')
          .then(async (response) => {
            setUsers(response.data);
            if(huntId){
              const fetchedHunt = await getHuntById(huntId);
              setHunt(fetchedHunt);
              if(hintNumber){
                const hintFound = await getHintByHuntIdAndHintNumber(huntId, hintNumber);
                setHintDetails(hintFound);
              } else if(fetchedHunt) {
                const fetchedHints = await getHintsByHuntId(huntId);
                setHints(fetchedHints);
              }
            }
          })
          .catch(error => {
            console.error('Error loading users: ', error);
            setError(error.response?.message ? error.response.message : 'Generic error');
            setIsLoading(false);
          });
      } catch (err) {
        console.error('Error loading hunt or hints:', err);
        setError(err.response?.message ? err.response.message : 'Generic error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [huntId, hintNumber]);

  const handleCreateHint = async (newHint) => {
    try {
      if(huntId){
        const newHintData = {...newHint, hunt: huntId}
        const createdHunt = await createHint(newHintData);
        setHints([...hints, createdHunt]);
      }
    } catch (err) {
      console.error('Error creating hint:', err);
      const errorMsg = err.response?.data?.message ? err.response.data.message : 'Generic error'; 
      await alert('Creating hint failed: '+ errorMsg);
    }
  }

  return (
    <Box marginTop={1}>
    { huntId ? 
      <>  
      {isLoading && <CircularProgress />}
      {error && <p>Error loading hunt or hints: {error}</p>}
      {hintNumber ?
        <Hint hint={hintDetails} userLogged={userLogged} usersList={users} />
      : users.filter(user => user.username === userLogged)[0]?.role !== 'admin' ?
          <div style={{textAlign: "center"}}>
          <SiAdblock color="#c3170C" size={48} />
          <Typography variant="h5">You don&#39;t have the necessary permissions to see all hints ;-&#41;</Typography> 
          </div>
        : hunt && (
          <>
          <Button
            color="success"
            variant="contained"
            startIcon={<IoAddCircleOutline/>}
            onClick={() => setOpenCreateForm(true)}
          >
            Add new hint
          </Button>
          <Typography variant="h5" align="center" gutterBottom marginTop={1}>
            Hints for {hunt.title}
          </Typography>
          <Grid container spacing={2}>
            {hints.map((hint) => (
              <Grid item xs={12} key={hint._id}>
                <Hint hint={hint} userLogged={userLogged} usersList={users}/>
              </Grid>
            ))}
          </Grid>
          <CreateHintForm
            open={openCreateForm}
            handleClose={() => setOpenCreateForm(false)}
            onSubmit={handleCreateHint}
          />
          </>
        )
      }
      </>
    : <div style={{textAlign: "center"}}>
        <SiAdblock color="#c3170C" size={48} />
        <Typography variant="h5">You have to scan a qr code or Open a hunt!</Typography> 
        <Button
          color="primary"
          variant="outlined"
          startIcon={<IoQrCodeOutline/>}
          onClick={() => setOpenGenerator(true)}
          sx={{marginTop: 3}}
        >
          Generate a QR-Code
        </Button>
        <Dialog fullScreen fullWidth open={openGenerator} onClose={() => setOpenGenerator(false)}>
          <DialogTitle>
            Genera QR Code
            <IconButton
              size="large"
              aria-label="close" 
              onClick={() => setOpenGenerator(false)} 
              sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              }} 
            >
              <IoClose />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <QRCodeGenerator /> 
          </DialogContent>
        </Dialog>
      </div>
    }
    </Box>
  );
}