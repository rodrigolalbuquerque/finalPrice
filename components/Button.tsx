// components/Button.tsx

interface ButtonProps {
  label: string;
  onClick?: () => void; // Add onClick prop as optional
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick} // Add onClick handler
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      {label}
    </button>
  );
};

export default Button;
