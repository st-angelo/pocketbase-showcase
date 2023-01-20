const Button = ({ label, onClick }) => {
  return (
    <button
      className={`w-full rounded-lg bg-sky-400 p-2 text-lg font-[500] text-white outline-none hover:bg-sky-500 focus:bg-sky-500`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
