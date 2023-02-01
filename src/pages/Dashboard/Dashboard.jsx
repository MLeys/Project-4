import { useState, useEffect } from "react";
import { Grid } from 'semantic-ui-react'
// import * as youTubeApi from "../src/utils/youTubeApi";
import * as youTubeApi from "../../utils/youTubeApi"
import * as skillsApi from "../../utils/skillApi"

import SidebarExampleTarget from "../../components/SideBar/SideBar";
import AddSkillForm from "../../components/AddSkillForm/AddSkillform";





function Dashboard() {
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');
    const [state, setState] = useState('');


    async function handleAddSkill(skill) {
      try { 
        const response = await skillsApi.create(skill);
        console.log(response, "++++ handleAddPost RESPONSE")

        setSkills([response.skill, skills])


      } catch(err) {
        setError(console.log('^^^^ Add Skill Error!!! ^^^^'));
        console.log(err, '<--- handleAddSKill ERROR');
      }
    } // END handleAddSkill Function

    async function getSkills() {
      try { 
        const response = await skillsApi.getAll();
        console.log(response, "++++ getAll Skills RESPONSE *************========");
        setSkills([response.data])

      } catch(err) {
        setError(console.log('^^^^ getSkills Error!!! ^^^^'));
        console.log(err, '<--- getSkills ERROR');
      }
    } // END getSkills Function
    


    async function searchYouTube() {
        
        try {
          const response = await youTubeApi.searchYouTube();
          console.log(response, " <------ response from YOUTUBE SEARCH");
          // update the cards with likes array
          
        } catch (err) {
          console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
        }
      }
    
    function handleChange(e) {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        //Getting posts, C(R)UD
        getSkills();
        
        
        
      }, []); 

    return ( 
      <Grid>
        <AddSkillForm handleAddSkill={handleAddSkill}/>
        <SidebarExampleTarget />
        <h1> Dashboard page </h1>

      </Grid>

    );
}

export default Dashboard;
