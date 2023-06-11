import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/Request";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/user/login", { email, password });
      console.log(res.user);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login">
     
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">email</label>
        <input
          name="email"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Login</button>
          {error && error}
      </form>
    </div>
  );
}

export default Login;
