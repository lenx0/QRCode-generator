import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import QRCodeHistory from './QRCodeHistory'

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [qrCodeValue, setQrCodeValue] = useState<string>('')
  const [qrCodesHistory, setQrCodesHistory] = useState<string[]>(() => {
    const storedCodes = localStorage.getItem('qrcodes')
    return storedCodes ? JSON.parse(storedCodes) : []
  })
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [historyLabelBtn, setHistoryLabelBtn] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  useEffect(() => {
    if (showHistory) {
      setHistoryLabelBtn('ocultar historico')
    } else {
      setHistoryLabelBtn('exibir historico')
    }
  }, [historyLabelBtn, showHistory])

  const generateQRCode = () => {
    setQrCodeValue(inputText)
    const updatedHistory = [...qrCodesHistory, inputText]
    setQrCodesHistory(updatedHistory)
    localStorage.setItem('qrcodes', JSON.stringify(updatedHistory))
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const clearHistory = () => {
    localStorage.removeItem('qrcodes')
    setQrCodesHistory([])
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
      <button onClick={generateQRCode} style={{ padding: '10px 20px' }}>
        Gerar QR Code
      </button>
      <div style={{ padding: 5 }}>
        <button onClick={toggleHistory}>{historyLabelBtn}</button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={clearHistory}>Apagar Histórico</button>
      </div>
      <div style={{ marginTop: '30px' }}>
        {qrCodeValue && <QRCode value={qrCodeValue} />}
      </div>
      {showHistory && <QRCodeHistory qrCodes={qrCodesHistory} />}
    </div>
  )
}

export default QRCodeGenerator
