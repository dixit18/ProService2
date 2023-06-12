/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/Slices/userSlice";
import { CometChat } from "@cometchat-pro/chat";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(setLoginModel(false))
  const user = useSelector((state) => state.auth);
  console.log(user);
  // useEffect(() => {
  // // if (user.email) {
  //   console.log(user.email);

  //   const authKey = "323381a8dcd5ea1dccaf9311acc0af4e44845425";

  //   // extracting user id for cometchat from email
  //   const uid = `user${user.id}`;
  //   const name = user.name;

  //   // ----- check weather the user is exist in cometchat or not ----- //
  //   CometChat.getUser(uid)
  //     .then(
  //       (existingUser) => {
  //         console.log("User already exists:", existingUser);
  //         // ----- if User already exists, proceed with login ----- //
  //         loginCometChatUser(uid, authKey);
  //       },
  //       (error) => {
  //         console.log("User does not exist:", error);
  //         // ----- User does not exist, create a new user ----- //
  //         const options = {
  //           method: "POST",
  //           headers: {
  //             accept: "application/json",
  //             "content-type": "application/json",
  //             apikey: authKey,
  //           },
  //           body: JSON.stringify({
  //             uid,
  //             name,
  //             withAuthToken: false,
  //           }),
  //         };

  //         fetch(
  //           `https://240637384dc0fd25.api-us.cometchat.io/v3/users`,
  //           options
  //         )
  //           .then((response) => response.json())
  //           .then((response) => {
  //             console.log("User created:", response);
  //             // ----- Proceed with login ----- //
  //             loginCometChatUser(uid, authKey);
  //           })
  //           .catch((error) => {
  //             console.log("Error creating user:", error);
  //           });
  //       }
  //     )
  //     .catch((error) => {
  //       console.log("Error checking user:", error);
  //     });
  //   // }s
  // }, [user.isLoggedIn]);

  // function loginCometChatUser(uid, authKey) {
  //   CometChat.login(uid, authKey)
  //     .then((user) => {
  //       console.log("Login Successful:", { user });
  //       navigate("/"); // ----- Redirect to the desired page after successful login ----- //
  //     })
  //     .catch((error) => {
  //       console.log("Login failed with exception:", { error });
  //       // ----- Handle login error ----- //
  //     });
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginAsync({ email, password }));

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
      }}
    >
      <div style={{ maxWidth: "300px", width: "100%" }}>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
