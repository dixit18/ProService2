import React, { useRef, useState } from "react";
import "./Services.scss";
// import { gigs } from "../../data";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/Request";
import { useLocation } from "react-router-dom";


function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation()
  // console.log(search)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async ()=>{
    try{ 
    const response=  await newRequest.get(`/services${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
    // console.log(response.data,"response")
    return response.data
    }catch(err){
        console.log("err",err)
        throw err
      }
    },
  })



  const reSort = (type) => {
    setSort(type);
    setOpen(false);
 
  };

  const apply = ()=>{
    refetch()
    console.log(minRef.current.value)
    console.log(maxRef.current.value)
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs"> Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with  AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ?"loading":error?"something went wrong": data.services.map((gig) => (
            <ServiceCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;


