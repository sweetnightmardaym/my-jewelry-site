import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header style={{ padding: '1rem', background: '#eee' }}>
      <h1>Jewelry Shop</h1>
      <nav>
        <Link to="/">Catalog</Link>
        {user ? (
          <>
            {' | '}
            <span>Hello, {user.name || user.email}</span>
            {' | '}
            <Link to="/profile">Profile</Link>
            {' | '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            {' | '}
            <Link to="/login">Login</Link>
            {' | '}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
