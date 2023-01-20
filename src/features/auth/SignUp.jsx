import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { useAuthentication } from './AuthProvider';

const SignUp = () => {
  const { signUp } = useAuthentication();

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
        name='username'
        label='Username'
        value={input.username}
        onChange={handleChange('username')}
      />
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
      <TextField
        name='passwordConfirm'
        label='Password confirm'
        type='password'
        value={input.passwordConfirm}
        onChange={handleChange('passwordConfirm')}
      />
      <Button label={'Sign up'} onClick={() => signUp(input)} />
      <Link to='/sign-in' className='text-sky-400 hover:underline'>
        Already have an account? Sign in
      </Link>
    </div>
  );
};

export default SignUp;
