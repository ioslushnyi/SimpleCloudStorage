import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((state) => state.user.authenticated);
  return (
    <>
      <div className="container text-center h-100">
        <div className="row justify-content-center h-100">
          <div className="col-12 align-self-center">
            <h1>Welcome</h1>
            <p>Store you files easily on your own cloud drive!</p>

            <div className="row justify-content-center">
              <div className="col-4 align-self-center">
                <div className="row justify-content-around">
                  {isAuth ? (
                    <Link to="/drive" className="btn btn-dark mt-2 w-auto">
                      My drive
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-dark mt-2 w-auto">
                        Sign in
                      </Link>
                      <Link
                        to="/registration"
                        className="btn btn-dark mt-2 w-auto"
                      >
                        Sign up
                      </Link>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
