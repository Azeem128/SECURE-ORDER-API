import React from 'react';

const Login = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(0,0,0,0.4)',
        padding: '60px 80px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '5rem', margin: 0 }}>LOGIN PAGE</h1>
        <p style={{ fontSize: '2rem', marginTop: '20px' }}>
          If you see this → the component is loading correctly!
        </p>
        <p style={{ fontSize: '1.5rem', marginTop: '30px' }}>
          Go to <strong>http://localhost:3000/register</strong> next
        </p>
      </div>
    </div>
  );
};

export default Login;