import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import TextField from '../components/common/TextField';
import { useAuthentication } from './auth/AuthProvider';
import _pb from './utils/pocketbase';

const AddPost = ({ onCancel, onAdd }) => {
  const { user } = useAuthentication();

  const [input, setInput] = useState({
    title: '',
    content: '',
  });

  const handleChange = useCallback(
    field => value => {
      setInput(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddPost = useCallback(async () => {
    await _pb.collection('posts').create({
      ...input,
      userId: user.id,
    });
    onAdd();
    onCancel();
    toast.success('The post was added');
  }, [input, user, onAdd, onCancel]);

  return (
    <div className='flex flex-col gap-3 p-5'>
      <TextField
        name='title'
        label='Title'
        value={input.title}
        onChange={handleChange('title')}
      />
      <TextField
        name='content'
        label='Content'
        value={input.content}
        onChange={handleChange('content')}
      />
      <Button label={'Add post'} onClick={handleAddPost} />
      <Button label={'Cancel'} onClick={onCancel} />
    </div>
  );
};

export default AddPost;
