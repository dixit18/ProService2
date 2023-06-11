import { Axios } from "../../config";
import React, { useState } from "react";
import { Button, Label, TextInput, Toast } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import requests from "../../libs/request";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { loginAsync } from "../../redux/Slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const dispatch = useDispatch()
 

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await Axios.post(`${requests.login}`, { email, password });
      // console.log(res);
      // localStorage.setItem("token", JSON.stringify(res.data));
      dispatch(loginAsync({ email, password }))
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
     
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh" }}>
      <div style={{ maxWidth: "300px", width: "100%" }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-indigo-600">Login with your credential</h1>
          <div>
            <div className="mb-2 block ">
              <Label className="text-indigo-600" htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email2"
              placeholder="dixitparmar@gmail.com"
              required
              shadow
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label className="text-indigo-600" htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password2"
              required
              shadow
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" style={{ backgroundColor: "#4821e7cc" }}>
            Login
          </Button>
       
        </form>
      </div>
    </div>
  );
}

export default Login;
