/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react/prop-types */
import React from "react";
import { BsStarFill } from "react-icons/bs";
import Slides from "../../Slides/Slides";
import Avatar from "../../../assets/icons/avatar.jpg";
import Reviews from "../../Reviews/Reviews";
import requests from "../../../libs/request";
import { Axios } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCheckLg } from "react-icons/bs";
import Slider from "react-slick";


const ProductDetail = ({ data, id, userId }) => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      Axios.get(`${requests.users}/${userId}`).then((res) => {
        return res.data.user;
      }),
    enabled: !!userId,
  });

  
  const user = useSelector((state) => state.auth);
  console.log(user, "user from service");
  const nevigate = useNavigate();

  const getServiceDate = () => {
    const createdAt = new Date(userData?.createdAt);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return createdAt.toLocaleDateString(undefined, options);
  };
  const starRating = Math.round(data?.totalStars / data?.starNumber);
  const hasRating = !isNaN(starRating);
  const handleBooking = async (e) => {
    if (!user.isLoogedIn) {
      console.log("inside if block");
      nevigate("/login");
      return;
    }

    e.preventDefault();
    try {
      const response = await Axios.post(`${requests.orders}/${id}`);
      nevigate("/bookings");
    } catch (err) {
      toast.error(err.response.data.message, "inside on error");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-24 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <div>
          <Slides rowId="4" distance={700}>
            {data?.images?.map((item, i) => (
              <div
                key={i}
                className="relative inline-block cursor-pointer w-full mx-4 shadow-box bg-gray-200"
              >
                <div className="w-full h-full">
                  <img
                    src={item}
                    alt={item}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slides>
          <Reviews serviceId={id}/>
        </div>
        <div className="space-y-6 md:space-y-10">
          <div>
            <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl leading-9">
              {data?.title}
            </h1>
            <p className="text-gray-900 font-light text-2xl">₹{data?.price}</p>
          </div>

          <div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-500 text-2xl font-light">
                {data.category}
              </p>
              <p className="text-lg">{data.desc}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-lg font-medium uppercase mb-4">
              Rating
            </p>
            {hasRating ? (
  <div className="flex items-center justify-start gap-1 text-yellow-400 text-lg font-semibold">
    {Array(starRating).fill().map((_, i) => (
      <span key={i}>
        <BsStarFill />
      </span>
    ))}
    <span>{starRating}</span>
  </div>
) : (
  <span className="text-red-500">No rating yet</span>
)}
          </div>

          <div>
            <p className="text-gray-500 text-lg font-medium uppercase mb-4">
              Features
            </p>
            <p className="text-sm font-medium text-darkColor">{data?.shortDesc}</p>
 
      <div className="flex flex-col gap-1 items-start justify-start w-full">
        {data.features.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-start gap-2 text-sm text-darkColor/70 font-semibold"
          >
            <BsCheckLg className="text-primary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
          </div>

          <div>
            <p className="text-gray-500 text-lg font-medium uppercase mb-4">
              About The Service Provider
            </p>

            <div className="flex items-start justify-start gap-3 w-full">
              <img
                src={userData?.avatar || Avatar}
                alt=""
                className="w-20 h-20 border rounded-full"
              />
              <div className="flex flex-col items-start justify-start gap-2">
                <h4 className="text-base font-bold text-darkColor">
                  {userData?.name}
                </h4>
                <div className="flex items-center justify-start gap-1 text-indigo-600 text-lg font-semibold">
                  {userData?.address}
                </div>
              </div>
            </div>
          </div>

          <div className="border w-full lg:w-[83%] p-5 rounded flex flex-col items-start justify-start gap-5">
          <div className="w-full flex items-start justify-between gap-4">
            <div className="w-[50%] flex flex-col items-start justify-start gap-3">
              <div className="flex flex-col gap-1"></div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-normal">
                  City
                </span>
                <h2 className="text-darkColor font-medium">{userData?.city}</h2>
              </div>
            </div>
            <div className="w-[50%] flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-normal">
                  Member since
                </span>
                <h2 className="text-darkColor font-medium">{getServiceDate()}</h2>
              </div>
            </div>
           </div>
           <p className="text-darkColor text-sm font-medium border-t w-full pt-4 pr-4">
             {console.log(data,"data")}
{data?.shortDesc}
           </p>
         </div>
    
     

         <button className="w-full h-10 rounded bg-primary/95 text-white hover:bg-primary outline-none" onClick={handleBooking}>
          Continue
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
