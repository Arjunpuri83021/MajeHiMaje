import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const sideNavbarRef = useRef(null);
  const searchDebounceTimeout = useRef(null); // To hold the debounce timer

  // Handle the input change for the search bar with manual debounce
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear the previous debounce timer
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }

    // Set a new debounce timer
    searchDebounceTimeout.current = setTimeout(() => {
      onSearch(query); // Trigger search after debounce delay
    }, 300); // 300ms debounce delay
  };

  // Clear the search bar when the cancel button is clicked
  const handleCancelSearch = () => {
    setSearchQuery("");
    onSearch(""); // Trigger search with empty query
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Toggle navigation menu visibility
  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  // Toggle navbar visibility on scroll
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarVisible(scrollTop < lastScrollTop || scrollTop < 100);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavbarRef.current && !sideNavbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar bg-body-tertiary ${isNavbarVisible ? '' : 'hidden'}`}>
        <div className="container-fluid">
          <span className="navbar-brand">
            <i onClick={toggleNavbar} className="bi bi-list"></i>
            <Link to="/">
              <img src="hexmy.png" alt="Maje logo" />
            </Link>
            <i onClick={toggleSearchBar} className="bi bi-search"></i>
          </span>

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
                        d="" // Empty path removed or updated as necessary
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </nav>

      <div className={`side-navbar ${isOpen ? "open" : ""}`} ref={sideNavbarRef}>
        <button className="close-btn" onClick={toggleNavbar}>
          <img className="sidenav-logo" src="hexmy.png" alt="" />
          <i className="bi bi-x-circle-fill"></i>
        </button>

        <ul className="responsive-nabar">
          <li>
            <Link to="/">
              <i className="bi bi-house"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/stars">
              <i className="bi bi-star"></i> Stars
            </Link>
          </li>
          <li>
            <Link to="/indian">
              <i className="bi bi-emoji-kiss"></i> Indians
            </Link>
          </li>
          <li>
            <Link to="/hijabi">
              <i className="bi bi-heart-pulse"></i> Hijabi
            </Link>
          </li>
          <li>
            <Link to="/popularVideos">
              <i className="bi bi-fire"></i> Popular videos
            </Link>
          </li>
          <li>
            <Link to="/newVideos">
              <i className="bi bi-clock"></i> New videos
            </Link>
          </li>
          <li>
            <Link to="/toprated">
              <i className="bi bi-heart"></i> Top rated videos
            </Link>
          </li>

          <li>
            <Link to="https://www.instagram.com/direct_hd_link/?utm_source=qr&igsh=eDJtaWEyNmF6OTJy">
              <i className="bi bi-hand-thumbs-up-fill"></i> Follow Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
