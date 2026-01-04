import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo / Title */}
        <Link to="/" className="logo">
          Estate Agent App
        </Link>
      </div>
    </header>
  );
}

export default Header;
