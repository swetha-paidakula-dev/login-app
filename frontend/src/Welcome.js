import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const username = localStorage.getItem("rememberedUser");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {username || "User"}!</h1>
      <p>You have successfully logged in to the application.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
