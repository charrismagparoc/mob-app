import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AuthContext = createContext();
const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes — change as needed

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const logFnRef = useRef(null);
  const timerRef = useRef(null);
  const userRef  = useRef(null); // ← always holds the latest user value

  // Keep userRef in sync with user state
  useEffect(() => { userRef.current = user; }, [user]);

  // Call this from AppContext to wire up the log function
  const setLogFn = (fn) => { logFnRef.current = fn; };

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function resetTimer() {
    clearTimer();
    if (!userRef.current) return;
    timerRef.current = setTimeout(() => {
      // Read from userRef — not the stale closure variable
      const currentUser = userRef.current;
      if (!currentUser) return;
      if (logFnRef.current) {
        logFnRef.current('Session timed out: ' + currentUser.name, 'Auth', currentUser.name);
      }
      clearTimer();
      setUser(null);
    }, TIMEOUT_MS);
  }

  useEffect(() => {
    if (user) resetTimer();
    else clearTimer();
    return clearTimer;
  }, [user]);

  const handleLogout = (reason = 'Signed out') => {
    // Log before clearing user — after setUser(null), user is gone
    if (logFnRef.current && user) {
      logFnRef.current(reason + ': ' + user.name, 'Auth', user.name);
    }
    clearTimer();
    setUser(null);
  };

  const login = (userData) => {
    if (userData?.id) { setUser(userData); return { success: true }; }
    return { success: false };
  };

  const logout = () => handleLogout('Signed out');

  return (
    <AuthContext.Provider value={{ user, login, logout, setLogFn, resetTimer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}