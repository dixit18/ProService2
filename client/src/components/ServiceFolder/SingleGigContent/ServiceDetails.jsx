/* eslint-disable react/prop-types */
import React from "react";
import { BsStarFill } from "react-icons/bs";
import Slides from "../../Slides/Slides";
import Avatar from "../../../assets/icons/avatar.jpg";
import Reviews from "../../Reviews/Reviews";
import requests from "../../../libs/request";
import { Axios } from "../../../config";
import { useQuery } from "@tanstack/react-query";

const ServiceDetails = ({ data, id, userId }) => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      Axios.get(`${requests.users}/${userId}`).then((res) => {
        return res.data.user;
      }),
    enabled: !!userId,
  });
  console.log("User: " , userData)

  const getServiceDate = () => {
    const createdAt = new Date(userData?.createdAt);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return createdAt.toLocaleDateString(undefined, options);
  };
const starRating = Math.round(data?.totalStars / data?.starNumber);
const hasRating = !isNaN(starRating);

  return (
    <div className="w-full flex items-start justify-start gap-3 flex-col">
      <div className="flex items-center justify-start gap-2 text-gray-500 text-sm font-medium">
        <span className="text-active capitalize">{data?.category}</span>
      </div>
      <h1 className="text-3xl font-bold text-darkColor/90 max-w-[790px]">
        {data?.title}
      </h1>
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="flex items-center justify-start gap-3">
          <img
            src={userData?.avatar || Avatar}
            alt={userData?.name}
            className="w-8 h-8 border rounded-full"
          />
          <span>{userData?.name}</span>
        </div>
       
      </div>
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
      <div className="w-[90%]">
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
      </div>
      <h2 className="text-xl font-semibold text-gray-500">About This Service</h2>
      <p className="text-base text-gray-700 max-w-[700px] font-normal">
        {data?.desc}
      </p>
      <div className="flex flex-col gap-3 mt-5 w-full">
        <h2 className="text-xl font-semibold text-gray-500">
          About The ServiceProvider
        </h2>
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
            <div className="flex items-center justify-start gap-1 text-yellow-400 text-lg font-semibold">
              {userData?.address}
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
      </div>
      <div className="flex flex-col gap-3 mt-5 w-full">
        <h2 className="text-xl font-semibold text-gray-500">Reviews</h2>
        <Reviews serviceId={id} />
      </div>
    </div>
  );
};

export default ServiceDetails;


