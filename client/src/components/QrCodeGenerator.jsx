import { Button, Container, Grid, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { IoSave } from "react-icons/io5";
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

export default function QRCodeGenerator() {
    const [value, setValue] = useState('');
    const [qrCodeImage, setQRCodeImage] = useState(null);
    const qrCodeRef = useRef(null);

    const handleInputChange = (event) => {
      setValue(event.target.value);
    };

    const saveQrCodeAsImage = async () => {
        if(!qrCodeRef.current) {
            console.error('QR code element not found.');
            return;
        }
        const canvas = await html2canvas(qrCodeRef.current);
        const dataURL = canvas.toDataURL('image/png');
        setQRCodeImage(dataURL);
      
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'qr-code.png';
        link.click();
    }
  
    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} marginTop={1}>
                <Grid item xs={12}>
                    <TextField
                        label="Insert text to generate QR-Code"
                        fullWidth
                        value={value}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                    <div ref={qrCodeRef}>
                        {value && <QRCode value={value} />}
                    </div>
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<IoSave />}
                        onClick={saveQrCodeAsImage}
                    >
                        Save as Image
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
  }