import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                isActive ? "active text-warning mr-2" : "inactive mr-2 text-primary"
                            }
                        >
                            Movies
                        </NavLink>

                        <NavLink
                            to="/rentals"
                            className={({ isActive }) =>
                                isActive ? "active text-warning mr-2" : "inactive mr-2 text-primary"
                            }
                        >
                            Rentals
                        </NavLink>

                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "active text-warning mr-2" : "inactive mr-2 text-primary"
                            }
                        >
                            Login Form
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
