import { createContext, useContext, useEffect } from 'react';
import { useDB } from '../hooks/useDB';
import { useAuth } from './AuthContext';

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const db = useDB();
  const { setLogFn } = useAuth();

  useEffect(() => {
    setLogFn(db.log);
  }, []); // ← empty deps: wire up once on mount; db.log is stable (useCallback)

  return <Ctx.Provider value={db}>{children}</Ctx.Provider>;
}

export function useApp() { return useContext(Ctx); }