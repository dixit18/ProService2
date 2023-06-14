/* eslint-disable react/prop-types */

import { Axios } from "../../config";

import loader from "../../assets/icons/loader.svg";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Review from "./Review/Review";
import {useSelector } from "react-redux"
const Reviews = ({ serviceId }) => {
const nevigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
    Axios.get(`/reviews/${serviceId}`).then((res) => {
        return res.data.reviews;
      }),
  });


  const mutation = useMutation({
    mutationFn: async (review) => {
      try {
        const response = await Axios.post("/reviews", review);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["service"]);
    }
  });
  
const user = useSelector(state=>state.auth)
console.log(user,"user fro m reviw")
  const handleSubmit = (e) => {
    if(!user.isLoogedIn
      ){
      nevigate("/login")
      return
    }
    e.preventDefault();

    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ serviceId:serviceId, star, desc:desc, });
  };

  return (
    <div className="w-full flex items-start justify-start flex-col gap-4">
    
    
    
      {isLoading
        ? (
                  <div className="flex items-center justify-center w-full">
                    <img src={loader} alt="/" className="w-[40px]" />
                  </div>
                )
        : error
        ? (
                  <p className="text-2xl text-red-400 font-normal">
                    Error : Something went wrong
                  </p>
                )
        :  (
                      data.map((item) => <Review key={item?._id} item={item} />)
                    )}
                 
                
      <div className="w-full flex flex-col items-start justify-start gap-4 mt-4 border-t pt-3">
        <h3 className="text-active text-xl font-semibold">Add a review</h3>
        <form action=""  className="flex items-start flex-col gap-2 justify-start w-full" onSubmit={handleSubmit}>
        <textarea
    className="w-full h-28 p-2 border border-gray-300 rounded-md resize-none"
    placeholder="Write your opinion"
    rows={4}
    cols={30}
  ></textarea>
          <label
                  htmlFor="star"
                  className="text-sm font-medium cursor-pointer"
                >
                  Rate
                </label>
          <select name="star" id="" className={`border outline-none cursor-pointer px-4 rounded focus:border-primary text-gray-400  h-10 `}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button   type="submit" className="outline-none bg-primary/80 hover:bg-primary w-fit px-5 py-2 rounded cursor-pointer text-white transition-all duration-300">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;

