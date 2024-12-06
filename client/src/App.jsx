import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  //useNavigate,
} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import Drive from "./components/Drive.jsx";

import { authorizeUser } from "./state/slices/userSlice";

function App() {
  const isAuth = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  useEffect(() => {
    dispatch(authorizeUser({ type: "authFromToken" }));
    //if (isAuth) {
    //  return navigate("/drive");
    //}
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100 vw-100">
        <header>
          <Navbar />
        </header>
        <main className="bg-body-tertiary flex-grow-1 flex-shrink-1">
          <Routes>
            <Route index element={<Home />} />
            {isAuth ? (
              <Route path="drive" element={<Drive />} />
            ) : (
              <>
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
