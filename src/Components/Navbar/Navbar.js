import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [darkNav, showDarkNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? showDarkNav(true) : showDarkNav(false);
    });
  }, []);

  return (
    <nav className={`navbar ${darkNav && "navbarDark"}`}>
      <img
        className="navbar__netflix-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="netflx_logo"
      />
      <img
        className="navbar__netflix-avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="netflix_avatar"
      />
    </nav>
  );
};

export default Navbar;
