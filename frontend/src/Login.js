import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  // Start with empty username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const loginButtonClick = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMsg("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("username", username);
        setErrorMsg("");
        navigate("/welcome");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid username or password"
      );
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={loginButtonClick}
      autoComplete="off" // prevent browser autofill
    >
      <div className="bg-container">
        <h1 className="heading-login">Login</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onChangeUsername}
          placeholder="Enter username"
          autoComplete="new-username" // strong suggestion for browsers
        />

        <br />

        <label htmlFor="password">Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter password"
            autoComplete="new-password" // strong suggestion for browsers
          />
          <span
            style={{ marginLeft: "5px", cursor: "pointer", fontSize: "20px" }}
            onClick={toggleShowPassword}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <br />

        <button className="buttons" type="submit">
          Login
        </button>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </form>
  );
};

export default Login;
