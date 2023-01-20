import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { useAuthentication } from './AuthProvider';

const SignIn = () => {
  const { signIn } = useAuthentication();

  const [input, setInput] = useState({
    email: '',
    password: '',
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
      <TextField
        name='password'
        label='Password'
        type='password'
        value={input.password}
        onChange={handleChange('password')}
      />
      <Button label={'Sign in'} onClick={() => signIn(input)} />
      <div className='flex w-full justify-between'>
        <Link to='/forgot-password' className='text-sky-400 hover:underline'>
          Forgot password?
        </Link>
        <Link to='/sign-up' className='text-sky-400 hover:underline'>
          Not registered? Sign up instead
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
