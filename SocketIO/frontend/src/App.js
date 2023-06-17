import "./App.css";

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const socket = useRef();
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <h1 style={{ textAlign: "center" }}>Welcome to chat application</h1>
          }
        />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
