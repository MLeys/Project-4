import { useState, useEffect } from "react";
import { Segment } from 'semantic-ui-react';
import { useParams } from "react-router-dom";

import SkillGroup from "../../components/SkillGroup/SkillGroup";


function Dashboard({loggedUser, unAssignSkillUser, handleDeleteSkill, 
  allSkills, getSkills, handleAddSubSkill, handleAddSkill, assignSkillUser }) {

  const { username } = useParams(); 
    useEffect(() => {
        //Getting posts, C(R)UD
        getSkills();
        
      }, []); 
  
  return (
    <>
    {
      allSkills?.map((skill) => {
        const assignIndex = skill.usersAssigned.findIndex(user => user.username === loggedUser.username)
        const ifAssigned = assignIndex > -1 ? true : false;
        console.log(skill.name, "<--Dashboard Skill")
    
        if (ifAssigned) {
          return (
            <Segment.Group raised key={skill._id}>
                <SkillGroup ifAssigned={ifAssigned} handleAddSkill={handleAddSkill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill} skill={skill} />
            </Segment.Group>
          ) 
        } 
    
      })

    }
    
    </>
  )
  
}

export default Dashboard;

    


    // async function searchYouTube() {
        
    //     try {
    //       const response = await youTubeApi.searchYouTube();
    //       console.log(response, " <------ response from YOUTUBE SEARCH");
    //       // update the cards with likes array
          
    //     } catch (err) {
    //       console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
    //     }
    //   }
    