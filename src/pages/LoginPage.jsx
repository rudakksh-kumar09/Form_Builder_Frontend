import React from 'react';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || ''}/api/auth/airtable`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Airtable Form Builder
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            margin: 0
          }}>
            Create dynamic forms connected to your Airtable bases
          </p>
        </div>
        
        <button 
          onClick={handleLogin}
          style={{
            background: 'linear-gradient(135deg, #4299e1, #3182ce)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(66, 153, 225, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(66, 153, 225, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(66, 153, 225, 0.3)';
          }}
        >
          🚀 Connect with Airtable
        </button>
        
        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: '#a0aec0'
        }}>
          Secure OAuth 2.0 authentication
        </p>
      </div>
    </div>
  );
}
