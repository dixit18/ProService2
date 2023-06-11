import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";

import "./Navbar.scss";

import newRequest from "../../utils/Request";

function NavbarComp() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);



  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    console.log("hello there");

    try {
      await newRequest.get("/user/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>

      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">ProService</span>
          </Link>
       
        </div>
        <div className="links">
          {!currentUser?.isServiceProvider && <span>Pro Apply</span>}
          <span>Help</span>
          <span>Explore</span>

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>

              <img
                src={currentUser.user.avatar || "../../../public/img/heart.png"}
                alt=""
              />
              <span>{currentUser?.user.name}</span>
              
              {open && (
                <div className="options">
                  {currentUser.user.isServiceProvider && (
                    <>
                      <Link className="link" to="/myservices">
                        Services
                      </Link>
                      <Link className="link" to="/add">
                        Add New Service
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/bookings">
                    Bookings
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                <span>Sign in</span>
              </Link>
              <Link className="link" to="/signup">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
     
    </div>
  );
}

const services = [
  {
    name: "AC Service ",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1615440995882-3b2e17.png",
  },
  {
    name: "Appliance Repair",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_72d18950.png",
  },
  {
    name: "Painter",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757627074-4b1dca.png",
  },
  {
    name: "Cleaning & infection",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_6b1f5250.png",
  },
  {
    name: "Electricians",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_07f29980.jpeg",
  },
  {
    name: "Plumber",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_6fbad370.png",
  },
  {
    name: "Carpenters",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_c65717e0.png",
  },
  {
    name: "Pest Control",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1604066433584-3d7851.png",
  },
  {
    name: "Salon For Women",
    img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757635235-1a139e.png",
  },
];

export default NavbarComp;
