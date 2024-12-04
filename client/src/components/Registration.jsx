//import { useState } from "react";

function Registration() {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  return (
    <>
      <form>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="htmlForm-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="htmlForm-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
}

export default Registration;
