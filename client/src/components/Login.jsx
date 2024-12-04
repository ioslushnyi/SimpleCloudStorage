import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginReducerAsync } from "../state/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="htmlForm-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
          />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="htmlForm-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => dispatch(loginReducerAsync({ email, password }))}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
