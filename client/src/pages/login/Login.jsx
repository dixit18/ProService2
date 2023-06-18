/* eslint-disable react/prop-types */
import React, {  useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/Slices/userSlice";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginAsync({ email, password }));

      navigate(-1);
    } catch (err) {
     
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="py-58"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <div  style={{ maxWidth: "300px", width: "100%" }} >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-indigo-600 text-2xl font-bold">
            Login with Your Credentials
          </h1>
          <div>
            <Label className="text-indigo-600" htmlFor="email" value="Email" />
            <TextInput
              id="email"
              placeholder="example@example.com"
              required
              shadow
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label
              className="text-indigo-600"
              htmlFor="password"
              value="Password"
            />
            <TextInput
              id="password"
              required
              shadow
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" style={{ backgroundColor: "#4821e7cc" }}>
            Login
          </Button>
        </form >
      </div>
    </div>
  );
}

export default Login;
