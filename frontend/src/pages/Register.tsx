import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const { token, user } = await res.json();
          setAuth(token, user);
          navigate('/');
        } else {
          alert('error');
        }
      }}
    >
      <h2>Register</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
