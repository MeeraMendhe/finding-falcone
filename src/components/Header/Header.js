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
            className={`${(isActive) =>
              isActive
                ? "nav-link-active"
                : ""} nav-link nav-link-story nav-link-margin `}
            to="/"
          >
            Story
          </NavLink>
          <NavLink
            className={`${(isActive) =>
              isActive ? "nav-link-active" : ""} nav-link nav-play`}
            to="/play"
          >
            Play
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
