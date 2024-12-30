import homeGif from "../assets/home.webp";
import "../assets/custom.css";
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { IoClose, IoQrCodeOutline } from "react-icons/io5";
import { LuScanQrCode } from "react-icons/lu";
import QrScanner from "../components/QrScanner";
import { useState } from "react";
import QRCodeGenerator from "../components/QrCodeGenerator";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

export default function HomePage() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [openGenerator, setOpenGenerator] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={1}> 
            <Grid item xs={12} sm={8} md={6}> 
                <Grid container spacing={2} justifyContent="center"> 
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                        Welcome aboard pirates...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={"center"}>
                        <img src={homeGif} alt="Home gif"></img>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                        Get ready to set sail!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={"center"} marginTop={1}>
                        <Button
                            size="large"
                            color="primary"
                            variant="outlined"
                            startIcon={<LuScanQrCode />}
                            onClick={handleOpenModal}
                        >
                            Scan a qr code
                        </Button>
                    </Grid>
                    <Grid item xs={12} textAlign={"center"} marginTop={1}>
                        <Button
                            color="primary"
                            variant="outlined"
                            startIcon={<IoQrCodeOutline/>}
                            onClick={() => setOpenGenerator(true)}
                        >
                            Generate a QR-Code
                        </Button>
                    </Grid>
                </Grid>
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
            </Grid>
            <Dialog
                fullWidth
                fullScreen
                open={modalIsOpen}
                onClose={handleCloseModal}
                style={customStyles}
            >
                <DialogTitle>
                    <LuScanQrCode /> Scan a qr code
                    <IconButton
                        size="large"
                        aria-label="close" 
                        onClick={handleCloseModal} 
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
                    <QrScanner onClose={handleCloseModal} />
                </DialogContent>
            </Dialog>
        </Grid>
    )
}
