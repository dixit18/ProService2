import React from "react";
import { useSelector } from "react-redux";
import AVATAR from "../../assets/icons/avatar.jpg"

export default function Profile() {
  const user = useSelector(state=>state.auth)
  return (
   
      <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-gray-200 w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={user.avatar || AVATAR}
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  alt="profile-1"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {user.name?.split(" ")[0]}
            </h3>
          </div>
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-4/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">{user.name}</span>
                  </li>

                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Mobile:</span>
                    <span className="text-gray-700">{user.phone}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">
                      {user.email}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Address:</span>
                    <span className="text-gray-700">{user.address}</span>
                  </li>
                 
                 
                </ul>
              </div>
            </div>
          </div>
    
        </div>
      </div>
   
  );
}