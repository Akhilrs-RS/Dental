import React, { useEffect, useState } from 'react';

export default function WhatsAppSimulator({ notification, onClose }) {
  const [typedMessage, setTypedMessage] = useState('');
  const [status, setStatus] = useState('typing'); // typing, sent, delivered

  if (!notification) return null;

  const { patientName, phone, date, time, room, dentist } = notification;
  const fullMessage = `Hello ${patientName || 'Patient'}, this is AuraDental Clinic. Your next appointment with ${dentist || 'Dr. Carter'} is confirmed for ${date || 'next visit'} at ${time || 'scheduled time'} in ${room || 'Operatory A'}. Please reply to confirm or cancel. 🦷`;

  useEffect(() => {
    // Typewriter effect simulation
    let index = 0;
    setStatus('typing');
    setTypedMessage('');
    
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setTypedMessage(prev => prev + fullMessage.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setStatus('sent');
        setTimeout(() => {
          setStatus('delivered');
        }, 1000);
      }
    }, 15); // Fast typing speed

    return () => clearInterval(interval);
  }, [notification]);

  return (
    <div 
      className="modal-overlay" 
      style={{ 
        zIndex: 2000, 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        style={{ 
          width: '360px', 
          height: '640px', 
          background: '#0e171b', // WhatsApp Dark background
          borderRadius: '40px',
          border: '10px solid #2d3748',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          animation: 'modalScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Phone Notch/Speaker */}
        <div style={{
          height: '24px',
          background: '#2d3748',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{ width: '60px', height: '4px', background: '#1a202c', borderRadius: '2px' }} />
        </div>

        {/* WhatsApp Header */}
        <div style={{
          background: '#075e54',
          color: '#fff',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '20px', cursor: 'pointer' }} onClick={onClose}>←</div>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#128c7e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            🦷
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>AuraDental Care</div>
            <div style={{ fontSize: '11px', color: '#b3d4d0' }}>
              {status === 'typing' ? 'typing...' : 'online'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '16px', opacity: 0.85 }}>
            <span>📞</span>
            <span>📹</span>
            <span>⋮</span>
          </div>
        </div>

        {/* Chat Wallpaper Container */}
        <div style={{
          flexGrow: 1,
          padding: '16px',
          backgroundImage: 'radial-gradient(#152026 15%, transparent 16%), radial-gradient(#152026 15%, transparent 16%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          backgroundColor: '#0b141a', // WhatsApp background
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflowY: 'auto'
        }}>
          {/* Timestamp Indicator */}
          <div style={{
            alignSelf: 'center',
            background: '#182229',
            color: '#8696a0',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '6px',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            Today
          </div>

          {/* Incoming Prompt/Intro (Opt-in details) */}
          <div style={{
            alignSelf: 'center',
            background: '#182229',
            color: '#ffd279',
            fontSize: '11px',
            padding: '8px 12px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '16px',
            maxWidth: '90%',
            lineHeight: '1.4'
          }}>
            🔒 Messages are encrypted. AuraDental is a verified WhatsApp Business Account.
          </div>

          {/* Sent Message Bubble */}
          <div style={{
            alignSelf: 'flex-end',
            background: '#005c4b', // WhatsApp outgoing bubble color
            color: '#e9edef',
            borderRadius: '8px 0px 8px 8px',
            padding: '8px 12px',
            maxWidth: '85%',
            position: 'relative',
            fontSize: '13px',
            lineHeight: '1.5',
            marginBottom: '10px',
            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)'
          }}>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {typedMessage}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '4px',
              fontSize: '10px',
              color: '#8696a0',
              marginTop: '4px',
              textAlign: 'right'
            }}>
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {status === 'sent' && <span style={{ color: '#8696a0' }}>✓</span>}
              {status === 'delivered' && <span style={{ color: '#53bdeb' }}>✓✓</span>}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '10px',
          background: '#101d25',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            flexGrow: 1,
            background: '#2a3942',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#8696a0',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Message ({phone || 'Patient'})</span>
            <span>📎 📷</span>
          </div>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#00a884',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '16px'
          }}>
            🎙️
          </div>
        </div>

        {/* Navigation Indicator / Close panel */}
        <div style={{
          background: '#0e171b',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            className="btn btn-secondary" 
            onClick={onClose} 
            style={{ 
              width: '80%', 
              background: 'transparent', 
              borderColor: '#2d3748', 
              color: '#00a884', 
              fontWeight: 600,
              fontSize: '13px',
              borderRadius: '20px'
            }}
          >
            Close Simulator Screen
          </button>
        </div>
      </div>
    </div>
  );
}
