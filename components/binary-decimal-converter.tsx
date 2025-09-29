import { useState } from 'react';

const BinaryDecimalConverter = () => {
  // State to track which bits are active (1) or inactive (0)
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  
  // Binary positions (powers of 2)
  const positions = [7, 6, 5, 4, 3, 2, 1, 0];
  const powers = positions.map(pos => Math.pow(2, pos));
  
  // Toggle a bit at a specific index
  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };
  
  // Calculate decimal values for each position
  const getDecimalValue = (index) => {
    return bits[index] * powers[index];
  };
  
  // Calculate total sum
  const getTotalSum = () => {
    return bits.reduce((sum, bit, index) => sum + (bit * powers[index]), 0);
  };
  
  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '24px', 
        textAlign: 'center', 
        color: '#1f2937' 
      }}>
        Conversor Binário-Decimal
      </h2>
      
      {/* Binary Row */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ 
            width: '48px', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151' 
          }}>
            Bin
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {bits.map((bit, index) => (
              <button
                key={index}
                onClick={() => toggleBit(index)}
                style={{
                  width: '48px',
                  height: '48px',
                  border: '2px solid',
                  borderColor: bit === 1 ? '#2563eb' : '#d1d5db',
                  backgroundColor: bit === 1 ? '#3b82f6' : '#f9fafb',
                  color: bit === 1 ? 'white' : '#6b7280',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                  boxShadow: bit === 1 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (bit === 0) {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseOut={(e) => {
                  if (bit === 0) {
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
              >
                {bit}
              </button>
            ))}
          </div>
        </div>
        
        {/* Powers of 2 labels */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '48px' }}></span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {positions.map((pos, index) => (
              <div key={index} style={{ 
                width: '48px', 
                textAlign: 'center', 
                fontSize: '12px', 
                color: '#6b7280' 
              }}>
                2<sup>{pos}</sup>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decimal Row */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            width: '48px', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151' 
          }}>
            Dec
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {bits.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '48px',
                  height: '48px',
                  border: '2px solid',
                  borderColor: bits[index] === 1 ? '#d1fae5' : '#e5e7eb',
                  backgroundColor: bits[index] === 1 ? '#f0fdf4' : '#f9fafb',
                  color: bits[index] === 1 ? '#065f46' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  borderRadius: '4px'
                }}
              >
                {getDecimalValue(index)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Sum */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151', 
          marginRight: '8px' 
        }}>
          SOMA =
        </span>
        <div style={{
          width: '64px',
          height: '48px',
          border: '2px solid #fed7aa',
          backgroundColor: '#fef3e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#9a3412',
          borderRadius: '4px'
        }}>
          {getTotalSum()}
        </div>
      </div>
      
      {/* Instructions */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#eff6ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe'
      }}>
        <p style={{ 
          fontSize: '14px', 
          color: '#1e40af',
          margin: '0 0 8px 0' 
        }}>
          <strong>Como usar:</strong> Clique nos quadrados da linha "Bin" para alternar entre 0 e 1. 
          Observe como os valores decimais correspondentes aparecem na linha "Dec" e como a soma total muda.
        </p>
        <p style={{ 
          fontSize: '12px', 
          color: '#1d4ed8',
          margin: 0
        }}>
          Cada posição representa uma potência de 2. O valor máximo é 255 (quando todos os bits são 1).
        </p>
      </div>
    </div>
  );
};

export default BinaryDecimalConverter;