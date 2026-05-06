import {
  createContext,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { users, type User } from '../data/user-mock.data';

// interface UserContextProps {
//   children: React.ReactNode;
// }

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
interface UserContextProps {
  // State
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  // Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useCallback((userId: number) => {
    const user = users.find((userMock) => userMock.id === userId);

    if (user) {
      setUser(user);
      setAuthStatus('authenticated');
      localStorage.setItem('userId', userId.toString());
      return true;
    } else {
      console.error(`User not found ${userId}`);
      setAuthStatus('not-authenticated');
      setUser(null);
      return false;
    }
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  }, []);

  const handleLoginEffect = useEffectEvent(() => {
    const storagedUserId = localStorage.getItem('userId');

    if (storagedUserId) {
      handleLogin(+storagedUserId);
      return;
    }

    handleLogout();
  });

  useEffect(() => {
    handleLoginEffect();
  }, []);

  const value: UserContextProps = useMemo(
    () => ({
      authStatus,
      user,
      isAuthenticated: authStatus === 'authenticated',
      login: handleLogin,
      logout: handleLogout,
    }),
    [authStatus, user, handleLogin, handleLogout],
  );

  return <UserContext value={value}>{children}</UserContext>;
};
