import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}
interface AuthContextProps {
  user: User | null;
  token: string | null;
  setAuth: (t: string, u: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  setAuth: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('jwt'),
  );
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (t: string, u: User) => {
    setToken(t);
    setUser(u);
    localStorage.setItem('jwt', t);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jwt');
  };

  useEffect(() => {
    if (token && !user) {
      fetch('/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => u && setUser(u));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
