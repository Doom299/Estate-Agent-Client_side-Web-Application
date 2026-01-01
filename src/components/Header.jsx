import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "15px 20px",
        marginBottom: "20px",
      }}
    >
      <h1>
        <Link
          to="/" // Link to home page
          style={{ color: "white", textDecoration: "none" }}
        >
          🏡 My Property Portal
        </Link>
      </h1>
    </header>
  );
}

export default Header;
