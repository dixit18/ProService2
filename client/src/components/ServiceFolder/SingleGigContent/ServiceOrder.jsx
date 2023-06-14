/* eslint-disable react/prop-types */
import React from "react";

import { BsCheckLg } from "react-icons/bs";

import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Axios } from "../../../config";
import requests from "../../../libs/request";
import { toast } from "react-toastify";

const ServiceOrder = ({ data, id }) => {

 const user = useSelector(state=>state.auth)
 
  const nevigate = useNavigate()
  
const handleBooking = async (e)=>{
  if(!user.isLoggedIn){
    console.log("inside if block")
    nevigate("/login")
    return
  }

  e.preventDefault()
  try{

    const response = await Axios.post(`${requests.orders}/${id}`)
    nevigate('/bookings')
  }catch(err){
    
      toast.error(err.response.data.message,"inside on error")
      
    }

}

  return (
    <div className="w-full bg-white border p-4 flex flex-col gap-4 items-start justify-start rounded">
      <div className="flex items-center justify-between gap-2 w-full">
        <h2 className="text-gray-800 text-sm font-bold">{data?.shortTitle}</h2>
        <p className="text-base font-normal">₹ {data?.price}</p>
      </div>
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
{/* {`/pay/${id}`} */}
{/* to={`/bookings`} */}
      <Link  className="w-full">
        <button className="w-full h-10 rounded bg-primary/95 text-white hover:bg-primary outline-none" onClick={handleBooking}>
          Continue
        </button>
      </Link>
    </div>
  );
};

export default ServiceOrder;
