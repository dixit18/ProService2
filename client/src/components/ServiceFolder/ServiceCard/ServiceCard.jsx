/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */




import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import Avatar from "../../../assets/icons/avatar.jpg";
import loader from "../../../assets/icons/loader.svg";
import { Axios } from "../../../config";
import requests from "../../../libs/request";
import { useQuery } from "@tanstack/react-query";

const ServiceCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`/services/single/${item._id}`}
      className="w-full shadow-box border group relative transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white pt-5 flex items-start flex-col gap-3 justify-start p-4">
      <img
        src={item?.cover}
        alt={item?.shortDesc}
        className="w-full object-cover h-[200px]"
      />
        <div className="flex items-center justify-start gap-3">
          {isLoading ? (
            <div className="w-8 h-8">
              <img
                src={loader}
                alt="loading..."
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="w-8 h-8">
              <img
                src={data?.avatar || Avatar}
                alt={data?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
          <div>
            <h2 className="text-sm font-medium">{data?.name}</h2>
          </div>
        </div>
        <p className="text-darkColor text-base group-hover:text-primary">
          {truckcateString(item.desc, 60)}
        </p>
        <div className="flex items-center gap-1 text-yellow-400 font-semibold">
          <BsStarFill />
          {!isNaN(item.totalStars / item.starNumber)
            ? Math.round(item.totalStars / item.starNumber)
            : 0}
        </div>
        <div className="border-t flex items-center justify-between">
          <span className="text-sm font-normal text-gray-500">
            Started at{" "}
            <span className="text-xl font-semibold text-darkColor">
              ₹{item.price}
            </span>
          </span>
        </div>
      </div>
      {isHovered && (
        <div className="bg-white py-5 px-4 absolute inset-0 transform rotate-y-180">
          <h2 className="text-lg font-medium mb-3">{item.title}</h2>
          <p className="text-darkColor text-base">
            <strong>Service Provider:</strong> {data?.name}
          </p>
          <p className="text-darkColor text-base">
            <strong>Address:</strong> {data?.address}
          </p>
          <p className="text-darkColor text-base">
            <strong>Description:</strong> {item.desc}
          </p>
          
        </div>
      )}
    </Link>
  );
};

export default ServiceCard;
