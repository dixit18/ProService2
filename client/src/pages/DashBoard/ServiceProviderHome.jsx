import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { useQuery } from "@tanstack/react-query";
import ChartComponent from './Chart'
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page c", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 300, pv: 2400, amt: 2400 },
];

const ServiceProviderHome = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      Axios.get(`${requests.orders}/dashboard`).then((res) => {
        return res.data;
      }),
  });
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Replace with your labels data
    data: [120, 200, 150, 80, 70, 110, 130] // Replace with your data
  };

  console.log(data,"dataform sdasjk",data?.totalRevenue[0].total)
  return (
  
    <>
      <div className="flex bg-gray-100 rounded-xl m-3 shadow-xl">
        <main className="flex-col bg-indigo-50 w-full ml-4 pr-6">
          <div className="flex justify-between mt-4 space-x-4 s">
            <div className="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
              <img src="https://i.imgur.com/VHc5SJE.png" alt="" />
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">{data?.totalBooking}</h1>
                <span className="text-gray-500">Total Booking</span>
              </div>
            </div>
            <div className="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
              <img src="https://i.imgur.com/Qnmqkil.png" alt="" />
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">{data?.monthlyCompletedRequest}</h1>
                <span className="text-gray-500">Total Completed Request</span>
              </div>
            </div>
            <div className="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
              <img src="https://i.imgur.com/dJeEVcO.png" alt="" />
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">{data?.totalRevenue[0].total}</h1>
                <span className="text-gray-500">Revenue</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
              <h1 className="text-xl font-bold text-gray-800 mt-4">
                Monthly Status
              </h1>
              <div className="flex justify-between space-x-4 text-center mt-6">
                
                <div className="bg-indigo-50 rounded-xl p-10">
                  <h3>{data?.monthlyCompletedRequest}</h3>
                  <spnan>Completed Request</spnan>
                </div>
                <div className="bg-indigo-50 rounded-xl p-10">
                  <h3>{data?.monthlyRevenue}</h3>
                  <spnan>Monthly Revenue</spnan>
                </div>
              </div>
            </div>
            <div className="justify-between rounded-xl mt-4  bg-white p-4 shadow-lg">
              <h1 className="text-xl font-bold text-gray-800 mt-4">
                Today’s Status
              </h1>
              <div className="flex justify-between space-x-4 text-center mt-6">
                <div className="bg-indigo-50 rounded-xl p-10">
                  <h3>{data?.todayPendingRequest}</h3>
                  <spnan>Today's Pending Request</spnan>
                </div>
                <div className="bg-indigo-50 rounded-xl p-10">
                  <h3>{data?.todayCompletedRequest}</h3>
                  <spnan>Today's Completed Request</spnan>
                </div>
               
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-10 space-x-4">
  <div className="w-1/2 rounded-xl mt-4 p-4 bg-white shadow-lg">
    <h1 className="text-xl font-bold text-gray-800 mt-4">Today’s Status</h1>
    <div className="flex justify-around space-x-4 text-center mt-6">
      <ChartComponent chartData={chartData} />
    </div>
  </div>
  <div className="w-1/2 rounded-xl mt-4 p-4 bg-white shadow-lg">
    <h1 className="text-xl font-bold text-gray-800 mt-4">Today’s Status</h1>
    <div className="flex justify-between space-x-4 text-center mt-6">
      {/* Content for the second box */}
    </div>
  </div>
</div>
        </main>
      </div>
    </>
  );
};

export default ServiceProviderHome;
