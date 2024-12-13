function UserMessage({ isError, message }) {
  return (
    <div>
      {isError && <span style={{ color: "red" }}>{message}</span>}
      {!isError && message && <span style={{ color: "blue" }}>{message}</span>}
    </div>
  );
}
export default UserMessage;
