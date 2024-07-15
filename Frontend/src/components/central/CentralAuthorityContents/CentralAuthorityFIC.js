import React, { useEffect, useState } from 'react'
import Header from '../Home/Header'
import CentralAuthoritySidebar from '../Home/CentralAuthoritySidebar'
import CentralAuthorityProfileCard from '../ProfileCard/CentralAuthorityProfileCard'

const CentralAuthorityFIC = () => {
  const [ficdetails, setficdetails] = useState();

  const getFicDetails = async () => {
     const url = "http://localhost:1024/api/v1/incharge/get-incharge2";
     const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok === true) {
      console.log(data)
      setficdetails(data.incharge);
      console.log("your Data is",data)
    } else {
      console.log(response.errorMessage);
      //console.log(response.ok);
    }
    
  }
  useEffect(() => {
    getFicDetails(); 
  },[])
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <Header />
      <div className="flex w-full">
        <CentralAuthoritySidebar />
        <div className="relative md:left-40  lg:left-60 sm:left-0 z-[-1] flex flex-wrap justify-center items-center mt-10 md:w-[80%] sm:w-[100%]">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
            {ficdetails && (
              <CentralAuthorityProfileCard Data={ficdetails}/>
           )} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CentralAuthorityFIC
