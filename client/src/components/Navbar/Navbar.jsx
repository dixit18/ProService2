import React, { useState, useEffect, useRef } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import RegistrationForm from "../../pages/register/Register";
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { FiChevronRight } from "react-icons/fi";
import { useSelector,useDispatch } from "react-redux";
import { logoutAsync } from "../../redux/Slices/userSlice";
import Profile from "../../pages/Profile/Profile";

 
const Navbar = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [profileModel,setProfileModal] = useState(false)
  const navigate = useNavigate();
  const user= useSelector(state=>state.auth)

  const [active, setActive] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const { pathname } = useLocation();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDrop(false);
        setProfileModal(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const backgroundChange = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", backgroundChange);
    return () => {
      window.removeEventListener("scroll", backgroundChange);
    };
  }, []);

  const slideRight = () => {
    let slider = document.getElementById("navSlider");
    let maxScrollLeft = slider.scrollWidth - slider.clientWidth; // maximum scroll position
    if (slider.scrollLeft < maxScrollLeft) {
      // check if not at the end
      slider.scrollLeft = slider.scrollLeft + 400;
    } else {
      // if at end, wrap to beginning
      slider.scrollLeft = 0;
    }
  };

  // let user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      // await Axios.get(requests.logout);
      // removeAuthUser();
      // localStorage.setItem("user", null);
      dispatch(logoutAsync())
      toast.success("Logout Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`flex items-center justify-center w-full flex-col text-white fixed top-0 transition-all ease-in-out z-20 ${
        active || pathname !== "/" ? "bg-white !text-darkColor" : ""
      }`}
    >
      <div className="contain">
        <div className="w-full flex items-center justify-between py-4 relative">
          <div className="flex items-center gap-2 h-full justify-between w-[50%] sm:w-fit">
            <Link
              to="/"
              className="text-4xl select-none font-black tracking-tighter"
            >
              <span className="text-primary">ProService</span>
            </Link>
          </div>
          <nav className="flex items-center justify-end gap-7 font-medium text-base">
            <div className="relative mx-auto text-gray-600 lg:block hidden">
              <input
                className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-2"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{
                    enableBackground: "new 0 0 56.966 56.966",
                  }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
            <NavLink
              to="/services"
              className="cursor-pointer hidden hover:text-indigo-600 sm:flex"
            >
              Services
            </NavLink>

            {!user?.isServiceProvider && (
              <p className="cursor-pointer hidden lg:flex">Pro Apply</p>
            )}
            {user.isLoogedIn ? (
              <>
                {user && (
                  <div
                    className="relative flex flex-col sm:flex-row items-center sm:gap-4 cursor-pointer"
                    onClick={() => setOpenDrop((prev) => !prev)}
                  >
                    <img
                      src={user.avatar || Avatar}
                      alt="user_image"
                      className="w-[32px] h-[32px] rounded-[50%] object-cover"
                    />
                    <span>{user?.name}</span>
                    
                    <div
                      ref={modalRef}
                      className={`absolute top-12 right-0 p-3 z-10 bg-white border rounded-md text-black flex-col items-start gap-3 w-[200px] font-medium transition-transform duration-300 ${
                        openDrop ? "flex" : "hidden"
                      }`}
                    >
                      <NavLink to="/" onClick={()=>setProfileModal(true)} className="cursor-pointer text-black hidden hover:text-indigo-600 sm:flex">
              Profile
            </NavLink>
                      {user?.isServiceProvider && (
                        <>
                          <NavLink
                            to="/myservices"
                            className="cursor-pointer w-full text-sm text-darkColor"
                          >
                            MyServices
                          </NavLink>
                          <NavLink
                            to="/add"
                            className="cursor-pointer w-full text-sm text-darkColor"
                          >
                            Add New Service
                          </NavLink>
                        </>
                      )}
                      <NavLink
                        to="/bookings"
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Bookings
                      </NavLink>
                      <NavLink
                        to="/messages"
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Messages
                      </NavLink>
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login" className="cursor-pointer hidden sm:flex">
                  Sign in
                </NavLink>
                <button
                  className={`border py-2 px-5 rounded hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-sm font-semibold ${
                    active ? "text-primary border-primary" : ""
                  }`}
                  onClick={() => setShowModal(true)} // Open the modal on button click
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 border-b ${
          active || pathname !== "/" ? "flex" : "hidden"
        }`}
      >
        <hr className="border-black" />
        <div className="contain relative">
          <div
            id={"navSlider"}
            className={`w-full inline-block h-full whitespace-nowrap scroll-smooth lg:flex items-center lg:justify-between py-3 overflow-x-auto gap-5 font-medium scrollbar-hide text-sm relative ${
              active || pathname !== "/" ? "!text-gray-500" : "text-gray-200"
            }`}
          ></div>
          <span
            onClick={slideRight}
            className="absolute z-10 top-3 -right-8 cursor-pointer laptop:hidden"
          >
            <FiChevronRight size={20} />
          </span>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative z-10 bg-white p-8">
            <RegistrationForm setShowModal={setShowModal} />
          </div>
        </div>
      )}


 {profileModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-gray-200 w-full mb-6 shadow-lg rounded-xl">
           <Profile/>
           </div>
         </div>
      )}

    </header>
  );
};

export  {Navbar};


