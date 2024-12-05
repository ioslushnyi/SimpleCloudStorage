import { useSelector } from "react-redux";

export default function Drive() {
  const isAuth = useSelector((state) => state.user.authenticated);
  return (
    <>
      <h1>My Drive</h1>
    </>
  );
}
