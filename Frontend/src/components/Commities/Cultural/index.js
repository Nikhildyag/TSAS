import React from "react";
import CulturalHeader from "./CulturalHeader";
import CulturalSidebar from "./CulturalSidebar";
import CommitteeCard from "../CommitteeCard";

const cardData={name:'Cultural Committee',complaintForm:'/culturalcommitteeform',purPose:'The Cultural Committee is dedicated to enriching campus life through vibrant cultural events, festivals, and competitions that showcase student talent in music, dance, drama, and literary activities. By celebrating diversity and cultural heritage, the committee fosters inclusivity and cultural exchange within the campus community. Through its initiatives, the committee aims to create memorable experiences that promote artistic expression and unity among students',  rolesAndResponsibilities:['Organize cultural events, festivals, and competitions.',' Showcase talent through music, dance, drama, and literary activities.','Celebrate diversity and cultural heritage within the campus community.','  Foster a sense of inclusivity and cultural exchange']      
}
const Cultural = () => {
  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <CulturalHeader name={"Academic Committee"} />
      <div className="flex w-full">
        <CulturalSidebar/>
        <CommitteeCard data={cardData}/>
      </div>
    </div>
  );
};

export default Cultural;

