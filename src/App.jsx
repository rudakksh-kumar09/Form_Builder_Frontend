import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormViewerPage from './pages/FormViewerPage';

function Navigation() {
  const location = useLocation();
  
  // Don't show navigation on form viewer pages
  if (location.pathname.startsWith('/form/')) {
    return null;
  }

  return (
    <nav style={{
      background: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '0',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#2d3748'
        }}>
          🎯 Form Builder
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/" 
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              color: location.pathname === '/' ? 'white' : '#4a5568',
              background: location.pathname === '/' ? 'linear-gradient(135deg, #4299e1, #3182ce)' : 'transparent',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            Login
          </Link>
          
          <Link 
            to="/builder" 
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              color: location.pathname === '/builder' ? 'white' : '#4a5568',
              background: location.pathname === '/builder' ? 'linear-gradient(135deg, #4299e1, #3182ce)' : 'transparent',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            Builder
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/builder" element={<FormBuilderPage />} />
          <Route path="/form/:id" element={<FormViewerPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
