/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import CustomizeTextArea from "../../utils/Input/CustomizeTextarea";
import { useNavigate } from "react-router-dom";
import {Axios}  from "../../config";
import requests from "../../libs/request";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import { BsUpload } from "react-icons/bs";
import { registerSchema } from "../../schemas";
import upload from "../../libs/upload";

function Register({ setShowModal }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isServiceProvider: false,
    address: "",
    avatar: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleServiceProvider = (e) => {
    setUser((prev) => {
      return { ...prev, isServiceProvider: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await Axios.post(`${requests.register}`, {
        ...user,
        avatar: url,
      });
      setShowModal(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
        <div className="relative z-10 bg-white p-8 flex justify-center items-center">
          <div className="bg-white text-primary rounded-lg shadow-md p-8 w-full max-w-lg">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Create a new account</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div>
                <label className="block mb-1" htmlFor="name">
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Dixit Parmar"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="avatar">
                  Avatar
                </label>
                <input
                  className="w-full py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="pincode">
                  Pincode
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="12345"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="address">
                  Address
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+9265469498"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="flex items-center">
                  <input
                  name="isServiceProvider"
                    id="isServiceProvider"
                    className="mr-2"
                    type="checkbox"
                    onChange={handleServiceProvider}
                  />
                  <label htmlFor="isServiceProvider">
                    Activate the ServiceProvider account
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <button
                  className="bg-indigo-500 text-primary px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                  type="submit"
                >
                  Register
                </button>
              </div>
              {error && <div className="text-red-500 col-span-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
