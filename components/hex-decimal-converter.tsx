import { useState, useRef, useEffect } from 'react';

const HexDecimalConverter = () => {
  // State to track hex digits (0-15, representing 0-F)
  const [hexDigits, setHexDigits] = useState([0, 0, 0]);
  const [isDragging, setIsDragging] = useState({ index: -1, startY: 0, startValue: 0 });
  
  // Hex positions (powers of 16)
  const positions = [2, 1, 0];
  const powers = positions.map(pos => Math.pow(16, pos));
  
  // Convert number to hex character
  const toHexChar = (num) => {
    return num.toString(16).toUpperCase();
  };
  
  // Handle wheel scroll
  const handleWheel = (e, index) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    updateDigit(index, delta);
  };
  
  // Handle touch/mouse drag
  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setIsDragging({
      index,
      startY: e.clientY || e.touches?.[0]?.clientY || 0,
      startValue: hexDigits[index]
    });
  };
  
  const handleMouseMove = (e) => {
    if (isDragging.index === -1) return;
    
    const currentY = e.clientY || e.touches?.[0]?.clientY || 0;
    const deltaY = isDragging.startY - currentY;
    const steps = Math.floor(deltaY / 10); // 10px per step
    const newValue = (isDragging.startValue + steps + 16) % 16;
    
    const newDigits = [...hexDigits];
    newDigits[isDragging.index] = newValue;
    setHexDigits(newDigits);
  };
  
  const handleMouseUp = () => {
    setIsDragging({ index: -1, startY: 0, startValue: 0 });
  };
  
  // Update a digit by delta
  const updateDigit = (index, delta) => {
    const newDigits = [...hexDigits];
    newDigits[index] = (newDigits[index] + delta + 16) % 16;
    setHexDigits(newDigits);
  };
  
  // Calculate decimal values for each position
  const getDecimalValue = (index) => {
    return hexDigits[index] * powers[index];
  };
  
  // Calculate total sum
  const getTotalSum = () => {
    return hexDigits.reduce((sum, digit, index) => sum + (digit * powers[index]), 0);
  };
  
  // Get hex string representation
  const getHexString = () => {
    return hexDigits.map(toHexChar).join('');
  };
  
  // Add global event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e) => handleMouseMove(e);
    const handleGlobalTouchEnd = () => handleMouseUp();
    
    if (isDragging.index !== -1) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);
  
  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '500px', 
      margin: '0 auto', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '24px', 
        textAlign: 'center', 
        color: '#1f2937' 
      }}>
        Conversor Hexadecimal-Decimal
      </h2>
      
      {/* Main conversion area */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #e2e8f0'
      }}>
        
        {/* Hex Row */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151',
              marginRight: '16px',
              minWidth: '40px'
            }}>
              Hex:
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: '#6b7280', fontWeight: '500' }}>0x</span>
              {hexDigits.map((digit, index) => (
                <div
                  key={index}
                  onWheel={(e) => handleWheel(e, index)}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  onTouchStart={(e) => handleMouseDown(e, index)}
                  style={{
                    width: '64px',
                    height: '64px',
                    border: '3px solid',
                    borderColor: isDragging.index === index ? '#3b82f6' : '#8b5cf6',
                    backgroundColor: isDragging.index === index ? '#ede9fe' : '#a855f7',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    cursor: 'grab',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: isDragging.index === index ? '0 4px 12px rgba(168, 85, 247, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                    userSelect: 'none',
                    touchAction: 'none'
                  }}
                >
                  {toHexChar(digit)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Powers of 16 labels */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ minWidth: '56px' }}></span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ width: '24px' }}></span>
              {positions.map((pos, index) => (
                <div key={index} style={{ 
                  width: '64px', 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  16<sup>{pos}</sup>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decimal Row */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151',
              marginRight: '16px',
              minWidth: '40px'
            }}>
              Dec:
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ width: '24px' }}></span>
              {hexDigits.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '64px',
                    height: '48px',
                    border: '2px solid',
                    borderColor: hexDigits[index] > 0 ? '#10b981' : '#d1d5db',
                    backgroundColor: hexDigits[index] > 0 ? '#ecfdf5' : '#f9fafb',
                    color: hexDigits[index] > 0 ? '#047857' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '16px',
                    borderRadius: '6px'
                  }}
                >
                  {getDecimalValue(index)}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sum and Hex display */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151', 
              marginRight: '12px' 
            }}>
              Decimal:
            </span>
            <div style={{
              padding: '8px 16px',
              border: '2px solid #f59e0b',
              backgroundColor: '#fef3c7',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#92400e',
              borderRadius: '6px',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {getTotalSum()}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151', 
              marginRight: '12px' 
            }}>
              Hex:
            </span>
            <div style={{
              padding: '8px 16px',
              border: '2px solid #8b5cf6',
              backgroundColor: '#f3e8ff',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#6b21a8',
              borderRadius: '6px',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              0x{getHexString()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div style={{
        padding: '16px',
        backgroundColor: '#f0f9ff',
        borderRadius: '8px',
        border: '1px solid #bae6fd'
      }}>
        <p style={{ 
          fontSize: '14px', 
          color: '#0c4a6e',
          margin: '0 0 8px 0',
          fontWeight: '500'
        }}>
          <strong>Como usar:</strong> Role a roda do mouse sobre os dígitos hexadecimais para alterá-los, ou pressione e arraste verticalmente.
        </p>
        <p style={{ 
          fontSize: '12px', 
          color: '#075985',
          margin: 0
        }}>
          Cada posição representa uma potência de 16. Valores de 0-F (0-15). Valor máximo: 4095 (0xFFF).
        </p>
      </div>
    </div>
  );
};

export default HexDecimalConverter;