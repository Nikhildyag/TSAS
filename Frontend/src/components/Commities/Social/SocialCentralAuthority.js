import React from "react";
import ProfileCard from "../../ProfileCard";
import SocialHeader from "./SocialHeader.js";
import SocialSidebar from "./SocialSidebar.js";

const SocialCentralAuthority = () => {
  const Data = {
    name: "Mahesh",
    ImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIGVupSyE17k0s5mH43ut12XoKYUgKCi6bQ&s",
    Designation: "CentralAuthority",
    Qualification: "PHD",
    Branch: "CSE",
  };
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <SocialHeader name={"Academic Committee"} />
      <div className="flex w-full">
        <SocialSidebar />
        <ProfileCard Data={Data} />
      </div>
    </div>
  );
};

export default SocialCentralAuthority;