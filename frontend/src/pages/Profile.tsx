import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { token, user, setAuth } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (token) {
      fetch('/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => {
          if (u) {
            setName(u.name);
            setPhone(u.phone);
          }
        });
    }
  }, [token]);

  if (!token) return <p>Please login</p>;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch('/api/v1/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, phone }),
        });
        if (res.ok) {
          const u = await res.json();
          setAuth(token, u);
          alert('Saved');
        }
      }}
    >
      <h2>Profile</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button type="submit">Save</button>
    </form>
  );
}
