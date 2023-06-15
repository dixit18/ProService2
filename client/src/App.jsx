import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import { Navbar } from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Orders from "./pages/orders/Orders";
import Services from "./pages/Services/Services";
import Service from "./pages/Service/Service";
import MyServices from "./pages/myServices/MyServices";
import Add from "./pages/add/Add";
import ProtectedRoute from "./components/ProtectedRoute/PrivateRoute";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import NotFound from "../src/pages/Errors/NotFound";
import { useSelector } from "react-redux";
import { CometChat } from "@cometchat-pro/chat";
import MapPage from "./pages/Map/MapPage";
import Dashboard from "./pages/Admin/Admin";


const App = () => {
  const appID = "240637384dc0fd25";
  const region = "us";
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  const user = useSelector((state) => state.auth.isLoogedIn);
  console.log("user from app", user);
  return (
    <div>
      <Navbar />
      {console.log("hello", user)}
      <Routes>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/single/:id" element={<Service />} />

        {<Route path="/bookings" element={<Orders />} />}
  
       
        <Route path="/map/:id" element={<MapPage/>}/>
      
        {
          <>
            <Route path="/myservices" element={<MyServices />} />
            <Route path="/add" element={<Add />} />
          </>
        }
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
