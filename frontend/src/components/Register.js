import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onSwitchToLogin }) => {
  // Estados para manejar los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // Petición al backend para registro
      const response = await axios.get(`http://localhost:3001/register?email=${email}&password=${password}`);
      setMessage(response.data);
      
      if (response.data === 'register successful') {
        // Limpiar formulario después del registro exitoso
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onSwitchToLogin(); // Cambiar a login después de 2 segundos
        }, 2000);
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="tu@email.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Tu contraseña"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Confirma tu contraseña"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        {message && (
          <p style={{
            ...styles.message,
            color: message === 'register successful' ? 'green' : 'red'
          }}>
            {message}
            {message === 'register successful' && ' - Redirigiendo al login...'}
          </p>
        )}

        <p style={styles.switchText}>
          ¿Ya tienes cuenta?{' '}
          <button 
            onClick={onSwitchToLogin}
            style={styles.switchButton}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

// Estilos CSS en JavaScript (reutilizando los del Login)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  message: {
    textAlign: 'center',
    marginTop: '1rem',
    fontWeight: 'bold'
  },
  switchText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666'
  },
  switchButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Register;