import React, { useState } from 'react'
import QRCode from 'qrcode.react'

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [qrCodeValue, setQrCodeValue] = useState<string>('')
  const [qrCodesHistory, setQrCodesHistory] = useState<string[]>(() => {
    const storedCodes = localStorage.getItem('qrcodes')
    return storedCodes ? JSON.parse(storedCodes) : []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const generateQRCode = () => {
    setQrCodeValue(inputText)
    const updatedHistory = [...qrCodesHistory, inputText]
    setQrCodesHistory(updatedHistory)
    localStorage.setItem('qrcodes', JSON.stringify(updatedHistory))
  }

  return (
    <div
      className='qrcode-container'
      style={{ textAlign: 'center', marginTop: '50px' }}
    >
      <h1>Gerador de QR Code</h1>
      <input
        type='text'
        value={inputText}
        onChange={handleChange}
        placeholder='Digite o texto ou URL'
      />
      <br />
      <button
        onClick={generateQRCode}
        style={{ padding: '10px 20px' }}
      >
        Gerar QR Code
      </button>
      <div style={{ padding: 5 }}>
        <button>Historico</button>
      </div>
      <div style={{ marginTop: '30px' }}>
        {qrCodeValue && <QRCode value={qrCodeValue} />}
      </div>
      <div>
        <h2>QRCodes anteriores</h2>
        {qrCodesHistory.map((code, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <QRCode value={code} />
            <p>{code}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QRCodeGenerator
