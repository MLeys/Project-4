import { useState, useEffect } from "react";
import { Grid } from 'semantic-ui-react'
// import * as youTubeApi from "../src/utils/youTubeApi";
// import * as youTubeApi from "../../utils/youTubeApi"
import * as skillsApi from "../../utils/skillApi"

// import SidebarExampleTarget from "../../components/SideBar/SideBar";
import AddSkillForm from "../../components/AddSkillForm/AddSkillForm";





function Dashboard() {
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');


    async function handleAddSkill(skill) {
        try {
            console.log(skill, "<<<<< skill data IN handleAddSKill")
      
            const response = skillsApi.create(skill);
            console.log(response, "++++ handleAddskill RESPONSE")
    
            setSkills([...skills, response.skill])
        } catch(err){
            console.log(err, " Error IN THE HANDLEADD")
        }

    } // END handleAddSkill Function

    // async function getSkills() {
    //   try {
    //     const response = await skillsApi.getAll();
    //     console.log(response, "++++ getAll Skills RESPONSE *************========");
    //     setSkills(response.data)

    //   } catch(err) {
    //     setError(console.log('^^^^ getSkills Error!!! ^^^^'));
    //     console.log(err, '<--- getSkills ERROR');
    //   }
    // } // END getSkills Function
    


    // async function searchYouTube() {
        
    //     try {
    //       const response = await youTubeApi.searchYouTube();
    //       console.log(response, " <------ response from YOUTUBE SEARCH");
    //       // update the cards with likes array
          
    //     } catch (err) {
    //       console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
    //     }
    //   }
    


    useEffect(() => {
        //Getting posts, C(R)UD
        // getSkills();
        
    
      }, []); 

      return ( 
        <>
         <AddSkillForm handleAddSkill={handleAddSkill} />
        <h1>HELLO is anything here</h1>
        </>
    
      );
}

export default Dashboard;
