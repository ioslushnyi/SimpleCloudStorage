function UserMessage({ isError, message }) {
  return (
    <>
      {isError && <span style={{ color: "red" }}>{message}</span>}
      {!isError && message && <span style={{ color: "blue" }}>{message}</span>}
    </>
  );
}
export default UserMessage;
