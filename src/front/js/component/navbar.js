import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span
            onClick={actions.updateFilters}
            className="navbar-brand mb-0 h1"
          >
            React Boilerplate
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
