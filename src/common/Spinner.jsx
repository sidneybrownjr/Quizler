export const Spinner = ({ text = "", size = "12em" }) => {
  const header = text ? <h4>{text}</h4> : null;

  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  );
};
