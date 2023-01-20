import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../features/auth/AuthProvider';
import ForgotPassword from '../features/auth/ForgotPassword';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import UserNotVerified from '../features/auth/UserNotVerified';
import Home from '../features/Home';

export default function AppRoutes() {
  const { isAuthenticated, isVerified } = useAuthentication();

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route
        path='/home'
        element={
          !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : !isVerified ? (
            <Navigate to='/not-verified' replace />
          ) : (
            <Home />
          )
        }
      />
      <Route
        path='/not-verified'
        element={
          isVerified ? (
            <Navigate to='/' replace />
          ) : !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : (
            <UserNotVerified />
          )
        }
      />
      <Route
        path='/sign-in'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignIn />}
      />
      <Route
        path='/sign-up'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignUp />}
      />
      <Route
        path='/forgot-password'
        element={
          isAuthenticated ? <Navigate to='/' replace /> : <ForgotPassword />
        }
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
