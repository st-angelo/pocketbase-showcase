import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import AddPost from './AddPost';
import { useAuthentication } from './auth/AuthProvider';
import _pb from './utils/pocketbase';

const Home = () => {
  const { user } = useAuthentication();

  const [posts, setPosts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const getPosts = useCallback(async () => {
    const posts =
      (await _pb.collection('posts').getFullList(50, {
        filter: `userId="${user.id}"`,
      })) || [];
    setPosts(posts.map(({ id, title, content }) => ({ id, title, content })));
  }, [user]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleDelete = useCallback(
    async id => {
      await _pb.collection('posts').delete(id);
      getPosts();
      toast.success('The post was deleted');
    },
    [getPosts]
  );

  return (
    <div className='flex flex-col justify-center gap-5 py-10 px-28'>
      <div className='self-end'>
        <Button label={'Add post'} onClick={() => setIsAdding(true)} />
      </div>
      {isAdding && (
        <AddPost onCancel={() => setIsAdding(false)} onAdd={getPosts} />
      )}
      {posts.map(post => (
        <div
          key={post.id}
          className='flex flex-col gap-2 rounded-md border-[1px] p-3 shadow-md'
        >
          <div className='flex justify-between'>
            <h3 className='text-center text-lg font-bold'>{post.title}</h3>
            <span
              className='cursor-pointer font-bold text-red-500 hover:underline'
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </span>
          </div>
          <span>{post.content}</span>
        </div>
      ))}
    </div>
  );
};

export default Home;
