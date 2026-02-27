import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Axios from "../../axios/Axios";

const Login = ({onlogin}) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage("");
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await Axios.post("/user/login", loginData);
      setLoginMessage("Login successful 🎉");
      await onlogin()
     
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLoginSubmit}>
        <h2 className="login-title">Welcome Back</h2>

        {loginMessage && <p className="login-success">{loginMessage}</p>}
        {loginError && <p className="login-error">{loginError}</p>}

        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />

        <button className="login-button" type="submit" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Login"}
        </button>

        <p className="login-switch-text">
          Don’t have an account?
          <span
            className="login-switch-link"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;