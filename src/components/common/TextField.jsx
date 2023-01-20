import React from 'react';

const TextField = ({ name, type, label, value, onChange }) => (
  <div className='relative w-full'>
    <input
      name={name}
      type={type || 'text'}
      placeholder={label}
      onChange={ev => onChange(ev.target.value)}
      value={value}
      className='peer my-4 w-full border-b-2 bg-transparent py-2 placeholder-transparent focus:border-sky-400 focus:outline-none'
    />
    <label
      htmlFor={name}
      className='pointer-events-none absolute top-0 left-0 text-sm text-slate-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-slate-500'
    >
      {label}
    </label>
  </div>
);

export default TextField;
