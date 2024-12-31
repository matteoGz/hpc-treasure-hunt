import { Button } from '@mui/material';
import { useState } from 'react';
import { IoReload } from 'react-icons/io5';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { util } from '../utils/util';

// eslint-disable-next-line react/prop-types
export default function QrScanner({ delay = 300 }) {
  const navigate = useNavigate();
  const [result, setResult] = useState(undefined);

  const handleScan = (data) => {
    if(data) {
      setResult(data);
      if(data.text){
        console.log(window.location.hostname)
        if(data.text.includes(window.location.hostname)){
          const urlToNavigate = util.extractInternalUrl(data.text);
          navigate(urlToNavigate);
        } else window.open(data.text, '_blank');
      }
    }
  };

  const handleError = (err) => {
    alert("Error during scan "+ err)
    console.error(err);
  };

  return (
    <div>
    {!result?.text ?
      <QrReader
        delay={delay}
        onError={handleError}
        onResult={handleScan}
        // comment bottom row in localhost enviroment
        constraints={{ facingMode: { ideal: 'environment' } }}
        style={{ width: '100%' }}
      />
    : <>
        <Button
          color='primary' 
          variant='outlined' 
          startIcon={<IoReload />} 
          onClick={() => setResult(undefined)}
        >
          ReScan
        </Button>
        <p>Result: <a href={result?.text}>{result?.text}</a></p>
      </>
    }
    </div>
  );
}