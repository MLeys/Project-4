import { useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
		Sidebar,
		Menu,
		Accordion,
		Icon
} from "semantic-ui-react";

import { useSkills, useSkillsDispatch } from "../../context/SkillsContext/SkillsContext";

import SkillAccordion from "../SkillAccordion/SkillAccordion";


function VerticalSidebar({
	assignSkillUser, unAssignSkillUser,
	animation, direction, visible, loggedUser,
	allSkills, handleAddSkill, handleDeleteSkill,
	handleClose
}) {
	const skills = useSkills()
	console.log(skills, " <=== Skills in vert sidebar from context")

	return (
		<Sidebar 
			style={{ textColor: 'white'}}
			as={Menu}
			animation={animation}
			direction={direction}
			inverted
			vertical
			visible={visible}
		>
			Available Skills
			<SkillAccordion 
				allSkills={allSkills} 
				currentUser={loggedUser} 
				assignSkillUser={assignSkillUser}
				unAssignSkillUser={unAssignSkillUser}
			/>

		</Sidebar>
	)

}

export default VerticalSidebar;