import { NavLink } from "react-router";
import { useSelector } from "react-redux";

function Navbar() {
  const isAuth = useSelector((state) => state.user.authenticated);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" end className="navbar-brand">
          Simple Cloud Storage
        </NavLink>
        {isAuth ? <h3>logged in</h3> : <h3>not auth</h3>}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
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
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <div
                  className="dropdown-menu"
                  style={{
                    left: -85,
                    top: 55,
                  }}
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="#">
                    My storage
                  </a>
                  <a className="dropdown-item" href="#">
                    Account settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Log out
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
