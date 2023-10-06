import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/coup-de-coeur"}
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Coups de coeur
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>React Movies</h1>
    </header>
  );
};

export default Header;
