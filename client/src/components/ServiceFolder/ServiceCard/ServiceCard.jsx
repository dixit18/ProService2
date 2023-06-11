/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill, BsFillHeartFill } from "react-icons/bs";
import Avatar from "../../../assets/icons/avatar.jpg";
import loader from "../../../assets/icons/loader.svg";
import { Axios } from "../../../config";
import requests from "../../../libs/request";
import { useQuery } from "@tanstack/react-query";

const ServiceCard = ({ item }) => {
 
  const { isLoading, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      Axios.get(`${requests.users}/${item.userId}`).then((res) => {
        return res.data.user;
      }),
  });


  const truckcateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Link
      to={`/services/single/${item._id}`}
      className="w-full shadow-box flex items-start flex-col justify-start border group"
    >
      <img
        src={item?.cover}
        alt={item?.shortDesc}
        className="w-full object-cover h-[200px]"
      />
      <div className="w-full bg-white pt-5 flex items-start flex-col gap-3 justify-start">
        <div className="flex items-center justify-start gap-3 px-4">
          {isLoading ? (
            <div className="w-4 h-4">
              <img
                src={loader}
                alt="loading..."
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              <div className="w-8 h-8">
                <img
                  src={data?.avatar || Avatar}
                  alt={data?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col items-start justify-start">
                <h2 className="text-sm font-medium">{data?.name}</h2>
               
              </div>
            </>
          )}
        </div>
        <p className="text-darkColor text-base group-hover:text-primary transition-all duration-300 px-4">
          {truckcateString(item.desc, 60)}
        </p>
        <p className="flex items-center justify-start gap-1 text-yellow-400 font-semibold px-4">
          <BsStarFill />
          {!isNaN(item.totalStars / item.starNumber) &&
            Math.round(item.totalStars / item.starNumber)}
            {console.log( Math.round(item.totalStars / item.starNumber),"math")}
        </p>
        <div className="border-t w-full p-5 flex items-center justify-between">
          <span className="text-gray-400 cursor-pointer">
            <BsFillHeartFill size={20} />
          </span>
          <span className="text-sm font-normal text-gray-500">
            started AT{" "}
            <span className="text-xl font-semibold text-darkColor">
            ₹{item.price}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
