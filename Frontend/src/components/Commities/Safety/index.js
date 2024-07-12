import React from "react";
import SafetyHeader from "./SafetyHeader.js";
import SafetySidebar from "./SafetySidebar.js";
import CommitteeCard from "../CommitteeCard";
const cardData={name:'Safety and Security Committee',complaintForm:'/campussafetycommitteeform',purPose:'The Social Service Committee is dedicated to fostering a spirit of social responsibility among students through organizing community service projects, volunteer activities, and outreach programs. By raising awareness about social issues and partnering with NGOs and local communities, the committee promotes active student engagement in humanitarian efforts. Through its initiatives, the committee aims to cultivate empathy, leadership, and a commitment to making a positive impact on society.', rolesAndResponsibilities:['Organize community service projects and volunteer activities.',' Raise awareness about social issues and promote social responsibility.','Partner with NGOs and local communities for outreach programs.','Encourage student engagement in humanitarian efforts.']      
}
const Safety = () => {
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <SafetyHeader name={"Academic Committee"} />
      <div className="flex w-full">
        <SafetySidebar />
        <CommitteeCard data={cardData}/>
      </div>
    </div>
  );
};

export default Safety;
