import { useContext} from "react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import AddSkillDisplay from "../AddSkillDisplay/AddSkillDisplay";

function VerticalSidebar({ 	animation, direction, visible }) {
	
	const skills = useContext(SkillsContext).skills
	// console.log(skills, " <=== Skills in vert sidebar from context")

	return (
		<>
			<h3>sidebar</h3>
		</>
	)

}

export default VerticalSidebar;