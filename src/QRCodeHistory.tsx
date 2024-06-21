import QRCode from 'qrcode.react'
import { useState } from 'react'

const QRCodeHistory: React.FC<{ qrCodes: string[] }> = ({ qrCodes }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 1
  const totalPages = Math.ceil(qrCodes.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedQrCodes = qrCodes.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <h2>Histórico de QR Codes</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px'
        }}
      >
        {paginatedQrCodes.map((code, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <QRCode value={code} />
            <p>{code}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
        style={{ minWidth: 50, textAlign: 'center' }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>
          {currentPage} / {totalPages}
        </span>
        <button style={{ minWidth: 50 }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

export default QRCodeHistory
