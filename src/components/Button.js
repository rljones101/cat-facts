export default function Button({ children, buttonStyle, onClick }) {
  return (
    <button className={`button-default ${buttonStyle}`} onClick={onClick}>
      {children}
    </button>
  );
}
