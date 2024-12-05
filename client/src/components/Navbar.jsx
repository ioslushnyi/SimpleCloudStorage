import { NavLink, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../state/slices/userSlice";

function Navbar() {
  const isAuth = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" end className="navbar-brand">
            Simple Cloud Storage
          </NavLink>
          {isAuth ? <h3>logged in</h3> : <h3>not auth</h3>}

          <div className="justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {!isAuth && (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" end className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/registration" end className="nav-link">
                      Registration
                    </NavLink>
                  </li>
                </>
              )}
              {isAuth && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Profile
                  </a>
                  <ul
                    className="dropdown-menu"
                    style={{
                      left: -85,
                      top: 55,
                    }}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        My storage
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Account settings
                      </a>
                    </li>
                    <div className="dropdown-divider"></div>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => dispatch(logoutUser())}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
