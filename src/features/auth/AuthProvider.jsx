import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import _pb from '../utils/pocketbase';

const AuthContext = React.createContext({
  isAuthenticated: false,
  isVerified: false,
  signIn: Promise.resolve,
  signUp: Promise.resolve,
  resetPassword: Promise.resolve,
  signOut: () => {},
});

export function useAuthentication() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    if (!_pb.authStore.isValid && _pb.authStore.model) {
      _pb.authStore.clear();
      navigate('sign-in');
      setUser({
        isAuthenticated: false,
        isLoading: false,
      });
    }
    const user = _pb.authStore.model;
    setUser({
      isAuthenticated: Boolean(user),
      isLoading: false,
      ...(user || {}),
    });
  }, [navigate]);

  //#region Handlers

  const signInHandler = useCallback(async input => {
    try {
      await _pb
        .collection('users')
        .authWithPassword(input.email, input.password);
      const user = _pb.authStore.model;
      setUser({
        isAuthenticated: Boolean(user),
        isLoading: false,
        ...(user || {}),
      });
    } catch (ex) {
      toast.error(ex.message);
    }
  }, []);

  const signUpHandler = useCallback(
    async input => {
      try {
        await _pb.collection('users').create({ ...input });
        await _pb.collection('users').requestVerification(input.email);
        navigate('sign-in');
      } catch (ex) {
        toast.error(ex.message);
      }
    },
    [navigate]
  );

  const resetPasswordHandler = useCallback(async input => {
    await _pb.collection('users').requestPasswordReset(input.email);
    toast.info('A reset email has been sent!');
  }, []);

  const signOutHandler = useCallback(async () => {
    _pb.authStore.clear();
    setUser({
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  //#endregion

  const data = useMemo(
    () => ({
      user,
      isAuthenticated: user.isAuthenticated,
      isVerified: user.isAuthenticated ? user.verified : false,
      signIn: signInHandler,
      signUp: signUpHandler,
      resetPassword: resetPasswordHandler,
      signOut: signOutHandler,
    }),
    [user, signInHandler, signUpHandler, resetPasswordHandler, signOutHandler]
  );

  return (
    <AuthContext.Provider value={data}>
      {user.isLoading && (
        <div className='flex min-h-screen flex-col items-center justify-center'>
          Loading
        </div>
      )}
      {!user.isLoading && children}
    </AuthContext.Provider>
  );
}
