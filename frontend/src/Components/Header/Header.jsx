import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pathname = location?.pathname;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1em 2em",
        borderBottom: "1px solid #444",
      }}
    >
      <Link to="/">
        <h4>MERN Authenticaion</h4>
      </Link>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <Link
          to="/profile"
          style={{ fontWeight: pathname === "/profile" ? "bold" : null }}
        >
          Profile
        </Link>
        <Link
          to="/auth/signup"
          style={{ fontWeight: pathname === "/auth/signup" ? "bold" : null }}
        >
          Signup
        </Link>
        <Link
          to="/auth/login"
          style={{ fontWeight: pathname === "/auth/login" ? "bold" : null }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
