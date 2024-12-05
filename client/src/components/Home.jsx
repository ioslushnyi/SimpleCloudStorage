import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((state) => state.user.authenticated);
  return (
    <>
      <h1>Home page</h1>
      {isAuth ? <h3>zdrasti</h3> : <h3>login or register</h3>}{" "}
    </>
  );
}
