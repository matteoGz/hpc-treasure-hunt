import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

// eslint-disable-next-line react/prop-types
export default function QrScanner({ delay = 300 }) {
  const [result, setResult] = useState('No result');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      if(data.text)
        window.open(data.text);
    }
  };

  const handleError = (err) => {
    alert("Error during scan "+ err)
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={delay}
        onError={handleError}
        onResult={handleScan}
        style={{ width: '100%' }}
      />
      <a href={result.text}>{result.text}</a>
    </div>
  );
}