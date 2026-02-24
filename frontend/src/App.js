function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1e40af',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '80px', margin: '0 0 30px 0' }}>
        HELLO AZEEM!
      </h1>
      <p style={{ fontSize: '40px' }}>
        If you see this blue page with big text → frontend is 100% working
      </p>
      <p style={{ fontSize: '24px', marginTop: '40px' }}>
        Next we add login form
      </p>
    </div>
  );
}

export default App;