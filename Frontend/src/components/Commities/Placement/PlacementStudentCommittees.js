import React from 'react'
import PlacementHeader from './PlacementHeader'
import PlacementSidebar from './PlacementSidebar'
import ProfileCard from '../../ProfileCard'

const PlacementStudentCommittee = () => {
        const Data={name:'Nikhil',ImageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIGVupSyE17k0s5mH43ut12XoKYUgKCi6bQ&s',Designation:'Student Incharge',Qualification:'CHEM',Branch:'CSE'}
        return (
            <div className="max-w-[100%] overflow-x-hidden text-wrap">
                <PlacementHeader name={"Academic Committee"} />
                <div className="flex w-full">
                <PlacementSidebar />
               <div className='relative left-60'>
                 <div className='flex'>
                    <ProfileCard Data={Data} className="mr-5"/>
                    <ProfileCard Data={Data} className="mr-5"/>
                  </div>
                  <div className='flex'>
                    <ProfileCard Data={Data} className="mr-5"/>
                    <ProfileCard Data={Data} className="mr-5"/>
                  </div>
                 </div>
                </div>
            </div>
        )
}

export default PlacementStudentCommittee