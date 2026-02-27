import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signup.css";
import Axios from "../../axios/Axios";

const Signup = ({onlogin}) => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [signupMessage, setSignupMessage] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupMessage("");
    setSignupError("");
    setSignupLoading(true);

    try {
      const res=await Axios.post("/user/signup", signupData);
      setSignupMessage("Signup successful 🎉 Redirecting...");
     await onlogin()
    } catch (err) {
      setSignupError(err.response?.data?.message || "Signup failed");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignupSubmit}>
        <h2 className="signup-title">Create Account</h2>

        {signupMessage && <p className="signup-success">{signupMessage}</p>}
        {signupError && <p className="signup-error">{signupError}</p>}

        <input
          className="signup-input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={signupData.name}
          onChange={handleSignupChange}
          required
        />

        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={signupData.email}
          onChange={handleSignupChange}
          required
        />

        <input
          className="signup-input"
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={signupData.mobile}
          onChange={handleSignupChange}
          pattern="[0-9]{10}"
          required
        />

        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleSignupChange}
          required
        />

        <button className="signup-button" type="submit" disabled={signupLoading}>
          {signupLoading ? "Signing up..." : "Signup"}
        </button>

        <p className="signup-switch-text">
          Already have an account?
          <span
            className="signup-switch-link"
            onClick={() => navigate("/")}
          >
            {" "}
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;