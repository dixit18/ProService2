import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Orders from "./pages/orders/Orders";
import Services from "./pages/Services/Services";
import Service from "./pages/Service/Service";
import MyServices from "./pages/myServices/MyServices";
import Add from "./pages/add/Add";
import ServiceProviderDashboard from "./pages/DashBoard/ServiceProviderHome";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import NotFound from "../src/pages/Errors/NotFound";
import { useSelector } from "react-redux";
import MapPage from "./pages/Map/MapPage";
import Dashboard from "./pages/DashBoard/Dashboard";

const App = () => {
  const isLoogedIn = useSelector((state) => state.auth.isLoogedIn);
  const isServiceProvider = useSelector(
    (state) => state.auth.isServiceProvider
  );
  console.log("isLoogedIn from app", isLoogedIn);
  console.log("is logjgi");
  return (
    <div>
      <Navbar />
      {console.log("hello", import.meta.env.VITE_BASEURL)}
      {isServiceProvider && <Dashboard />}
      <Routes>
        {isServiceProvider ? (
          <Route path="/" element={<ServiceProviderDashboard />} />
        ) : (
          <Route path="/" element={<Homepage />} />
        )}
        {isServiceProvider}
        {!isServiceProvider && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/single/:id" element={<Service />} />
          </>
        )}

        {/* <Route path="/video" element={<Video />} />
        <Route path="/video/:videoId" element={<Room/>}/> */}

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
