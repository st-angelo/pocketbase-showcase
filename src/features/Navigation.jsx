import { useAuthentication } from './auth/AuthProvider';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { useMemo } from 'react';

const Navigation = () => {
  const { user, isAuthenticated, isVerified, signOut } = useAuthentication();

  const menu = useMemo(
    () => (
      <Menu>
        <MenuItem className='cursor-pointer p-2 text-lg' onClick={signOut}>
          Sign out
        </MenuItem>
      </Menu>
    ),
    [signOut]
  );

  return (
    isAuthenticated &&
    isVerified && (
      <div className='m-auto flex max-w-4xl items-center justify-between py-2'>
        <span className='text-3xl font-extrabold text-sky-400'>SOME APP</span>
        <div className='flex items-center gap-2'>
          <span>
            Hi, <span className='font-bold'>{user.username}</span>
          </span>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            animation='slide-up'
            placement='bottomCenter'
          >
            <img
              className='w-12 cursor-pointer rounded-full border-4 border-sky-400'
              src='https://www.tiffin.edu/wp-content/uploads/2022/01/devon_stock-e1673536702615.png'
              alt='avatar'
            />
          </Dropdown>
        </div>
      </div>
    )
  );
};

export default Navigation;
