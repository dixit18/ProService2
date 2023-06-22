import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus, FiBook, FiMessageSquare, FiStar } from 'react-icons/fi';

const ServiceNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/myservices" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiHome className="mr-2" />
                  My Services
                </Link>
                <Link to="/add" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiPlus className="mr-2" />
                  Add New Service
                </Link>
                <Link to="/bookings" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiBook className="mr-2" />
                  Bookings
                </Link>
                {/* <Link to="/messages" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiMessageSquare className="mr-2" />
                  Messages
                </Link> */}
                {/* <Link to="/reviews" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiStar className="mr-2" />
                  Reviews
                </Link> */}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open mobile menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/myservices" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <FiHome className="mr-2" />
              My Services
            </Link>
            <Link to="/addnewservice" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <FiPlus className="mr-2" />
              Add New Service
            </Link>
            <Link to="/bookings" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <FiBook className="mr-2" />
              Bookings
            </Link>
            <Link to="/messages" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <FiMessageSquare className="mr-2" />
              Messages
            </Link>
            <Link to="/reviews" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <FiStar className="mr-2" />
              Reviews
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ServiceNavbar;
