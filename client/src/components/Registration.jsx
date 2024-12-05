import { useState } from "react";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-center" style={{ height: "90vh" }}>
          <div className="col-4 align-self-center">
            <div className="card">
              <div className="card-body">
                <div className="card-title mb-3">
                  <h3>Sign up</h3>
                </div>
                <div className="htmlForm-group m-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="htmlForm-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                  />
                </div>
                <div className="htmlForm-group m-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="htmlForm-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-dark mt-2">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
