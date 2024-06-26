import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';



const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");

    // toast.success("Logout Successfully");
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const headerStyles = {
    backgroundColor: isScrolled ? 'white' : '#f8be67',
    position: isScrolled ? 'sticky' : 'relative',
    top: 0,
    zIndex: 1,
    transition: 'background-color 0.3s ease-in-out',
    // boxShadow: 'none',
    // borderBottom: 'none',
  };

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav className="navbar navbar-expand-lg" style={headerStyles}>

        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />Shadow-Stories k
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">Shadow-Stories</Link >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink >
              </li>






              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {auth?.user?.role === 1 && (  // Assuming role "author" signifies the user is an author
                      <li><NavLink to={`/dashboard/author`} className="dropdown-item">Dashboard</NavLink></li>
                    )}
                    <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Log Out</NavLink></li>
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

export default Header