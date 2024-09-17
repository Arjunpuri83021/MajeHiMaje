import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false); // Manage search bar visibility
  const [showNavMenu, setShowNavMenu] = useState(false); // Manage nav-ul visibility

  // Handle the input change for the search bar
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // Clear the search bar when the cancel button is clicked
  const handleCancelSearch = () => {
    setSearchQuery("");
    onSearch(""); // Clear the search query
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Toggle navigation menu visibility
  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo */}
          <span className="navbar-brand">
            {/* Toggle Navigation Menu */}

            <i onClick={toggleNavbar} className="bi bi-list"></i>
            <Link to="/">
              <img src="hexmy.png" alt="Maje logo" />
            </Link>
            {/* Search Icon */}

            <i onClick={toggleSearchBar} className="bi bi-search"></i>
          </span>

          {/* Search Bar - Conditionally Rendered */}
          {showSearchBar && (
            <form className="d-flex mt-2" role="search">
              <div className="searchBar">
                <input
                  style={{ color: "#fff" }}
                  value={searchQuery}
                  onChange={handleInputChange}
                  id="searchQueryInput"
                  type="text"
                  name="searchQueryInput"
                  placeholder="Search videos..."
                />
                <button
                  id="searchQuerySubmit"
                  type="button"
                  name="searchQuerySubmit"
                  onClick={searchQuery ? handleCancelSearch : null}
                >
                  {searchQuery ? (
                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                      <path
                        fill="#666666"
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                      />
                    </svg>
                  ) : (
                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                      <path
                        fill="#666666"
                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </nav>

      {/* Nav Links - Conditionally Rendered based on toggle */}

      <ul className="nav-ul">
        <NavLink exact to="/" activeClassName="active-link">
          <li>All</li>
        </NavLink>
        <NavLink to="/stars" activeClassName="active-link">
          <li>Stars</li>
        </NavLink>
        <NavLink to="/indian" activeClassName="active-link">
          <li>Indians</li>
        </NavLink>
        <NavLink to="/hijabi" activeClassName="active-link">
          <li>Hijabi</li>
        </NavLink>
      </ul>

      <div className={`side-navbar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stars">Stars</Link>
          </li>
          <li>
            <Link to="/indian">Indians</Link>
          </li>
          <li>
            <Link to="/hijabi">Hijabi</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
