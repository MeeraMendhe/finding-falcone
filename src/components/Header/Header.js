import "./Header.css";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <div className="header">
        <NavLink className="hero" to="/">
          Finding Falcone
        </NavLink>
        <ul className="navigation">
          <NavLink
            activeClassName="nav-link-active"
            className="nav-link nav-link-story nav-link-margin"
            exact
            to="/"
          >
            Story
          </NavLink>
          <NavLink
            activeClassName="nav-link-active"
            className="nav-link nav-play"
            exact
            to="/find-falcone"
          >
            Play
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
