import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Grid,
    Segment,
    Form,
    Button

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'
import subSkills from "../../../controllers/subSkills";

import SubSkillCard from "../../components/SubSkillCard/SubSkillCard";


export default function SubSkillPage({ handleEditSubSkill}) {
    
    const subParams = useParams();
    const parentName = useParams().skillName;
    const subId = useParams().id 
    // console.log(allSkills, "all skills here")
    const parentSkill = allSkills?.find((skill) => skill.name === parentName);
    // setParent(parentSkill)
    // console.log(parentSkill, "parentskill")
    const subSkills = parentSkill?.subSkills
    // console.log(subSkills, "subskills")
    const subSkill = subSkills?.find((sub) => sub._id === subId)

    console.log(`parent: ${parentName} \n subSkillID: ${subId} \n subParams: ${subParams} \n subSkill: ${subSkill}\nparentSkill: ${parentSkill}\n`)
    // console.log(parentName, subId, subParams, "Three things from subskillpage")
    // console.log(subSkill, "<--subSkill on subSkillPage")
    
    const navigate = useNavigate();
    
    const [state, setState] = useState({
        subId: subId,
        title: subSkill.title,
        details: subSkill.details,
        parentSkill: subSkill.parentSkill,

    })

    function handleChange(e) {
		console.log(e.target.name, "e.target.name in handleChange in Addskillform")
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
		console.log(state, " <<<UPDATED STATE FROM HANDLE CHANGE")
      }

    function handleSubmit(e) {
		e.preventDefault();
	
		console.log(state, "<___<<<<<<<< state in handleSubmit")
		handleEditSubSkill(state);
    navigate('/');
	}
    
  return (
	<Segment>
        <Form onSubmit={handleSubmit}>
            <Form.Input
                className="form-control"
                name="title"
                value={state.title}
                placeholder="{state.title}"
                onChange={handleChange}
                
            />
            <Form.Input
                className="form-control"
                name="details"
                value={state.details}
                placeholder="about details"
                onChange={handleChange}
            />
            <Button type="submit" className="btn">
                Edit Subskill
            </Button>
        </Form>
    </Segment>

  );
}