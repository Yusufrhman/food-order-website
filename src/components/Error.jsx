function Error({ title, message }) {
  return (
    <div
      className="error"
      style={{
        display: "flex",
        padding: "2rem",
        background: "red",
        flexDirection: "column",
        width: "fit-content",
        margin: "0 auto"
      }}
    >
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Error;
