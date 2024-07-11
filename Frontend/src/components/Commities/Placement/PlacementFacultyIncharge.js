import React from "react";
import PlacementHeader from "./PlacementHeader";
import PlacementSidebar from "./PlacementSidebar";
import ProfileCard from "../../ProfileCard";

const PlacementFacultyIncarge = () => {
  const Data = {
    name: "Nikhil",
    ImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIGVupSyE17k0s5mH43ut12XoKYUgKCi6bQ&s",
    Designation: "Faculty Incarge",
    Qualification: "PHD",
    Branch: "CSE",
  };
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <PlacementHeader name={"Academic Committee"} />
      <div className="flex w-full">
        <PlacementSidebar />
        <div className="relative md:left-40  lg:left-60 sm:left-0 z-[-1] flex flex-wrap justify-center items-center mt-10 md:w-[80%] sm:w-[100%] ">
          <ProfileCard Data={Data} />
        </div>
      </div>
    </div>
  );
};

export default PlacementFacultyIncarge;