import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'
import subSkills from "../../../controllers/subSkills";

import SubSkillCard from "../../components/SubSkillCard/SubSkillCard";


export default function SubSkillPage({ loggedUser, skill, allSkills, getSkills}) {
    
    const subParams = useParams()
    const parentName = useParams().skillName;
    const subId = useParams().id 
    // console.log(allSkills, "all skills here")
    const parentSkill = allSkills?.find((skill) => skill.name === parentName);
    // setParent(parentSkill)
    // console.log(parentSkill, "parentskill")
    const subSkills = parentSkill?.subSkills
    // console.log(subSkills, "subskills")
    const subSkill = subSkills?.filter((sub) => sub._id === subId)

    console.log(parentName, subId, subParams)
    console.log(subSkill, "<--subSkill on subSkillPage")
    
    
    
    const [state, setState] = useState({
        name: "",
        type: "",
    })

    function handleChange(e) {
		console.log(e.target.name, "e.target.name in handleChange in Addskillform")
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
		// console.log(state, " <<<UPDATED STATE FROM HANDLE CHANGE")
      }

    function handleSubmit(e) {
		e.preventDefault();
	
		console.log(state, "<___<<<<<<<< state in handleSubmit")
		handleAddSkill(state);
	}
    
  return (
	
	<Segment>
		<h1> this is inside form segment</h1>
		<Form onSubmit={handleSubmit}>
		<Form.Input
			className="form-control"
			name="name"
			value={state.name}
			placeholder="Enter Skill Name"
			onChange={handleChange}
			
		/>
		<Form.Input
			className="form-control"
			name="type"
			value={state.type}
			placeholder="Enter Type of Skill"
			onChange={handleChange}
		/>
		<Button type="submit" className="btn">
			Add Skill
		</Button>

		</Form>
	</Segment> 

  );
}