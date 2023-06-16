import React, { useState, useEffect, useRef } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import RegistrationForm from "../../pages/register/Register";
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../redux/Slices/userSlice";
import Profile from "../../pages/Profile/Profile";


const Navbar = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [profileModel, setProfileModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const [active, setActive] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const { pathname } = useLocation();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDrop(false);
        setProfileModal(false);
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

 
  const handleLogout = async () => {
    try {
      dispatch(logoutAsync());
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
      className={`flex items-center justify-center w-full flex-col text-black fixed top-0 transition-all ease-in-out z-20 ${
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
                      <NavLink
                        to="/"
                        onClick={() => setProfileModal(true)}
                        className="cursor-pointer text-black hidden hover:text-indigo-600 sm:flex"
                      >
                        Profile
                      </NavLink>
                      
                    { !user.isServiceProvider &&  <>
                     <NavLink
                        to="/bookings"
                        className="cursor-pointer w-full text-sm text-darkColor"
                        >
                        Bookings
                      </NavLink>
                      {/* <NavLink
                        to="/messages"
                        className="cursor-pointer w-full text-sm text-darkColor"
                        >
                        Messages
                      </NavLink> */}
                        </>
                        }
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

      <hr className="border-black" />

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
            <Profile />
          </div>
        </div>
      )}
    </header>
  );
};

export { Navbar };
