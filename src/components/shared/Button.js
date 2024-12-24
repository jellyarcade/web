const Button = ({ children, ...props }) => (
  <button
    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600"
    {...props}
  >
    {children}
  </button>
);

export default Button;
