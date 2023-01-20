import Navigation from '../features/Navigation';
import AppRoutes from './Routes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../features/auth/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <AuthProvider>
        <main>
          <Navigation />
          <AppRoutes />
        </main>
      </AuthProvider>
      <ToastContainer position='bottom-center' theme='colored' />
    </div>
  );
};

export default App;
