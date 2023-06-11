import React from "react";
import "./ServiceCard.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/Request";
import { useQuery } from "@tanstack/react-query";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/user/${item.userId}`);

        // console.log(data, "response");
        return response.data;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
    },
  });
console.log("data",data)
  return (
    <Link to={`/services/single/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "something went wrong"
          ) : (
            <div className="user">
              <img src={item.pp || "../../../public/img/coin.png"} alt="" />
              <span>{data.user.name}</span>
            </div>
          )}
          <p>{item.desc}</p>

          <div className="star">
            <img src="./img/star.png" alt="" />

            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
