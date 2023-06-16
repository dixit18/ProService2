/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { MdMail } from "react-icons/md";
import {AiFillEnvironment} from  "react-icons/ai";
import { ordersColumns } from "../../data/data";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import requests from "../../libs/request";
import loader from "../../assets/icons/loader.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "../../utils/Pagination/Pagination";


const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isClicked, setIsClicked] = useState("");
  const user = useSelector((state) => state.auth);
  

  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["orders", currentPage],

    queryFn: () =>
      Axios.get(`${requests.orders}?page=${currentPage}`).then(
        (res) => res.data
      ),
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAcceptServiceForProvider = async (acceptId) => {
    try {
      const response = await Axios.patch(`${requests.orders}/${acceptId}`, {
        status: "accepted",
      });
     
    } catch (err) {
      console.log(err);
    }

    setIsClicked((prev) => !prev);
  };

  const handleRejectServiceForProvider = async (deleteid) => {
    try {
      const response = await Axios.patch(`${requests.orders}/${deleteid}`, {
        status: "rejected",
      });
      console.log(response, "responser form delete");
    } catch (err) {
      console.log(err);
    }
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [isClicked]);

  const Box = ({ color, text }) => {
    return (
      <div
        style={{
          border: "2px solid black",
          borderRadius: "8px",
          backgroundColor: `${color}`,
          width: "85px",
          // height: "35px",
          paddingTop: "4px",
          text:"white",
          textweight: "bold",
        }}
      >
        <h6>{text}</h6>
      </div>
    );
  };

  const tableActions = data?.data?.map((item) => {


    const isStatusCompleted = item.status === "completed";
  const isRejected = item.status === "rejected";
const urlFormap = user.isServiceProvider?item.buyerId._id:item.iserviceProviderId._id;

    let actionButton;
   
    if (!user.isServiceProvider) {
      if (item.status === "pending") {
        actionButton = <Box color={"#34ebd2"} text={"Pending"}></Box>;
      } else if (item.status === "accepted") {
        actionButton = (
          <Link to={`/pay/${item._id}`}>
            <Box color={"#ADD8E6"} text={"Pay"}></Box>
          </Link>
        );
      } else if (item.status === "completed") {
        actionButton = <Box color={"#8e2ffa"} text={"Completed"}></Box>;
      } else {
        actionButton = <Box color={"#d92733"} text={"Rejected"}></Box>;
      }
    } else {
      actionButton = (
        <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAcceptServiceForProvider(item._id)}
            disabled={item.status !== "pending"}
          >
            <CheckCircleIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRejectServiceForProvider(item._id)}
            disabled={item.status !== "pending"}
          >
            <DeleteIcon />
          </Button>

        </div>
      );
    }



    return {
      info: (
        <div className="w-14 h-14 relative">
        <img
          src={user.isServiceProvider ? item.buyerId.avatar : item.iserviceProviderId.avatar}
          alt={item.title}
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium">Name:{user.isServiceProvider ? item.buyerId.name : item.iserviceProviderId.name}</p>
          <p className="text-xs">Address:{user.isServiceProvider ? item.buyerId.address : item.iserviceProviderId.address}</p>
        </div>
      </div>
    ),
      title: (
        
      
        <Link to={`/services/single/${item.serviceId}`}
        className={`w-full flex items-center justify-start ${
          isRejected ? "line-through" : ""
        }`}
        style={{
          color: isRejected ? "red" : isStatusCompleted ? "#3949AB" : "",
        }}
        >
        {item.title}
      </Link>
       
     
      
      ),
      price: (
        <p className="w-full flex items-center justify-start">{item.price}</p>
      ),
      Contact: (
        <div
          className={`w-8 h-8 cursor-pointer bg-indigo-600 rounded-full flex items-center justify-center text-white ${
            !isStatusCompleted ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <MdMail size={18} />
        </div>
      ),
      actions: <div>{actionButton}</div>,
      map: (
        <Link to={`/map/${urlFormap}`}
          className={`w-8 h-8 cursor-pointer bg-indigo-600 rounded-full flex items-center justify-center text-white 
          ${
            !isStatusCompleted ? "opacity-50 pointer-events-none" : ""
          }`}
        >
         
         <AiFillEnvironment/>
        </Link>
      )
    };
  });

  return (
    <main className={` pb-10 ${user.isServiceProvider?"":"pt-20"}`}>
      <div className="contain">
        <div className="w-full flex flex-col items-start gap-5 justify-start">
          <div className="flex items-center justify-between w-full gap-2">
            {<h2 className="text-2xl text-indigo-600 font-bold">{`${user.isServiceProvider?" ":"Bookings"}`}</h2>}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <img src={loader} alt="/" className="w-[40px]" />
            </div>
          ) : error ? (
            <p className="text-2xl text-red-400 font-normal">
              Error : Something went wrong
            </p>
          ) : (
            <>
              {data?.data.length === 0 ? (
                <div className="flex items-center justify-center mt-5 flex-col w-full pb-24 pt-24">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
                    alt="/"
                    className="w-[350px]"
                  />
               
                </div>
              ) : (
                <table className="w-full">
                  <thead className="h-[35px]">
                    <tr>
                      {ordersColumns &&
                        ordersColumns.map((head, i) => (
                          <th
                            key={i}
                            className="text-left text-gray-700 text-sm font-semibold leading-[18px] pb-2"
                          >
                            {head.header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {tableActions &&
                      tableActions.map((row, i) => (
                        <tr
                        key={i}
                        className="text-sm leading-5 w-full even:bg-gray-200"
                        >
                         
                          {ordersColumns?.map((col, i) => (
                            <td
                            key={i}
                            className="first:text-left text-sm text-darkColor font-medium text-center py-2"
                            >
                              {row[col.field]}
                            </td>
                          ))}
                          
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
          {data?.totalPages > 1 && (
            <div style={{ width: "100%" }}>
              <Pagination
                totalPages={data.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Orders;
