import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { useAuthentication } from './AuthProvider';

const ForgotPassword = () => {
  const { resetPassword } = useAuthentication();

  const [input, setInput] = useState({
    email: '',
  });

  const handleChange = useCallback(
    field => value => {
      setInput(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div className='m-auto flex h-full w-[400px] flex-col items-center justify-center gap-2 md:w-[550px]'>
      <TextField
        name='email'
        label='Email'
        value={input.email}
        onChange={handleChange('email')}
      />
      <Button label={'Send email'} onClick={() => resetPassword(input)} />
      <Link to='/sign-in' className='text-sky-400 hover:underline'>
        Remembered it? Sign in
      </Link>
    </div>
  );
};

export default ForgotPassword;
