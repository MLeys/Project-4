import { useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
		Sidebar,
		Menu,
		Segment,
		Accordion,
		Icon
} from "semantic-ui-react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SkillAccordion from "../SkillAccordion/SkillAccordion";
import AddSkillDisplay from "../AddSkillDisplay/AddSkillDisplay";

function VerticalSidebar({ 	animation, direction, visible }) {
	
	const skills = useContext(SkillsContext).skills
	// console.log(skills, " <=== Skills in vert sidebar from context")

	return (
		<Sidebar 
			style={{ textColor: 'white'}}
			as={Menu}
			direction={direction}
			inverted={true}
			vertical={true}
			animation={animation}
			visible={visible}
		>
			<AddSkillDisplay />
			<SkillAccordion />

		</Sidebar>
	)

}

export default VerticalSidebar;