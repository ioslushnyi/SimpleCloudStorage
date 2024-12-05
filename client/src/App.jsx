import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import Drive from "./components/Drive.jsx";

import { authenticateUser } from "./state/slices/userSlice";

function App() {
  const isAuth = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  useEffect(() => {
    dispatch(authenticateUser());
    //if (isAuth) {
    //  return navigate("/drive");
    //}
  }, []);

  return (
    <BrowserRouter>
      <div className="">
        <Navbar />
        <main>
          <div className="bg-body-tertiary" style={{ height: "90vh" }}>
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
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
