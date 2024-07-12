import React from "react";
import HealthHeader from "./HealthHeader.js";
import HealthSidebar from "./HealthSidebar.js";
import CommitteeCard from "../CommitteeCard";
const cardData={name:'Health Committee',complaintForm:'/healthcommitteeform',purPose:'The Health Committee is committed to promoting holistic health and wellness initiatives among students. Through organizing  health camps, workshops, and awareness programs, the committee aims to educate and empower students to prioritize their well-being. Providing first aid training and emergency medical assistance, the committee ensures prompt response to  health-related incidents on campus. Collaborating with health professionals, the committee facilitates access to comprehensive campus health services, fostering a supportive environment that prioritizes the physical and mental well-being of students.',  rolesAndResponsibilities:['Promote health and wellness initiatives among students.',' Organize health camps, workshops, and awareness programs.','Provide first aid training and emergency medical assistance.',' Collaborate with health professionals for campus health services.']      
}

const Health = () => {
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <HealthHeader name={"Academic Committee"} />
      <div className="flex w-full">
        <HealthSidebar />
        <CommitteeCard data={cardData}/>
      </div>
    </div>
  );
};

export default Health;
