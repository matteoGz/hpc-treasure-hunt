import { Box, Button, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import notFoundGif from "../assets/notfound.webp";

export default function NotfoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:1
      }}
    >
      <ErrorIcon sx={{ fontSize: 100, color: 'error.main' }} />
      <Typography variant="h4" component="h1" gutterBottom>
        ERROR 404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        PAGE NOT FOUND
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: "italic", marginBottom: 1 }}>
        Sorry, but the request page does not exists.
      </Typography>
      <img src={notFoundGif} width={256} height={256} alt="Not found gif"></img>
      <Button variant="contained" color="primary" startIcon={<IoHome/>} onClick={() => navigate('/')} sx={{marginTop:3}}>
        Back to Home
      </Button>
    </Box>
  )
}
