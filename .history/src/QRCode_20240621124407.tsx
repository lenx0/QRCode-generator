import React, { useState, ChangeEvent } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [qrCodeValue, setQrCodeValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const generateQRCode = () => {
    setQrCodeValue(inputText);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder=" Put your message or URL"
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button onClick={generateQRCode} style={{ minWidth: '100px', padding: '10px 20px', cursor: 'pointer' }}>
        Generate
      </button>
      <div style={{ marginTop: '30px' }}>
        {qrCodeValue && <QRCode value={qrCodeValue} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
