import { useState } from "react";
import { useDispatch } from "react-redux";

import { authorizeUser } from "../state/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <div className="container text-center h-100">
        <div className="row justify-content-center h-100">
          <div className="col-4 align-self-center">
            <div className="card">
              <div className="card-body">
                <div className="card-title mb-3">
                  <h3>Sign in</h3>
                </div>
                <div className="htmlForm-group m-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="htmlForm-control border-box w-100"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                  />
                </div>
                <div className="htmlForm-group m-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="htmlForm-control border-box w-100"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark mt-2"
                  onClick={() =>
                    dispatch(
                      authorizeUser({
                        type: "login",
                        data: { email, password },
                      })
                    )
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
