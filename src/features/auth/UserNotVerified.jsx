import Button from '../../components/common/Button';
import { useAuthentication } from './AuthProvider';

const UserNotVerified = () => {
  const { signOut } = useAuthentication();

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <h3 className='text-lg font-bold'>You are not verified!</h3>
      <span className='italic'>
        Please check your email. You will be able to access our full features
        after you verify
      </span>
      <div className='mt-5 w-36'>
        <Button label='Sign out' onClick={signOut} />
      </div>
    </div>
  );
};

export default UserNotVerified;
