import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/Request";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isServiceProvider: false,
    address: "",
    avatar:"",
    phone:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleServiceProvider = (e) => {
    setUser((prev) => {
      return { ...prev, isServiceProvider: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await newRequest.post("/user/signup", {
        ...user,
        avatar: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="name"
            type="text"
            placeholder="Dixit Parmar"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">avatar</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a ServiceProvider</h1>
          <div className="toggle">
            <label htmlFor="">Activate the se account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleServiceProvider} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+9265469498"
            onChange={handleChange}
          />
          <label htmlFor="">address</label>
          <textarea
            placeholder="A short description of yourself"
            name="address"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {error && (error)}
        </div>
      </form>
    </div>
  );
}

export default Register;
