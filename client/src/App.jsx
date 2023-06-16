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
import Dashboard from "./pages/DashBoard/Dashboard";

const App = () => {
  const isLoogedIn = useSelector((state) => state.auth.isLoogedIn);
  const isServiceProvider = useSelector(
    (state) => state.auth.isServiceProvider
  );
  console.log("isLoogedIn from app", isLoogedIn);
  return (
    <div>
      <Navbar />
      {console.log("hello", isLoogedIn)}
      {isServiceProvider && <Dashboard />}
      <Routes>
        {isServiceProvider}
       {!isServiceProvider &&  (<>
       <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/single/:id" element={<Service />} />
       </>
        )
        
        }
        {isLoogedIn && <Route path="/bookings" element={<Orders />} />}
        {isLoogedIn && <Route path="/map/:id" element={<MapPage />} />}
        {<Route path="/add" element={<Add />} />}

        {isLoogedIn && <Route path="/myservices" element={<MyServices />} />}

        {isLoogedIn && <Route path="/pay/:id" element={<Pay />} />}
        {isLoogedIn && <Route path="/success" element={<Success />} />}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
