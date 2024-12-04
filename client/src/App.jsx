import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";

function App() {
  /*
  ADD AUTH MIDDLEWARE AND AUTO AUTH ON LOAD

  const isAuth = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch()}, [])
  */
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
