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
      <h1>Gerador de QR Code</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Digite o texto ou URL"
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button onClick={generateQRCode} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Gerar QR Code
      </button>
      <div style={{ marginTop: '30px' }}>
        {qrCodeValue && <QRCode value={qrCodeValue} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
