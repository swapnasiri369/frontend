import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isAdmin, isLoggedIn, onLogout }) => {

    
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">MyApp</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {isAdmin && (
          <li>
            <Link to="/admin/users" className="admin-link">
              Admin Panel
            </Link>
          </li>
        )}
      </ul>

      <div className="navbar-actions">
        {!isLoggedIn ? (
          <Link to="/" className="btn-login">Login</Link>
        ) : (
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;