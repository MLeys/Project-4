import { useState, useEffect, useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { 
	Segment,
	Card,
	Button,
	Icon,
	Label,
	Grid,
	Header,
	Container,
	Item

} from 'semantic-ui-react';



function SubSkillsTabDisplay( {skill} ) {
	const ctx = useContext(SkillsContext)
	const [resources, setResources] = useState([]);
	const [subSkills, setSubSkills] = useState([]);
	
	function getResources() {
		pass
	} 
	

  useEffect(() => {
    
    
  }, []); 

	return (  
		<>
			SubSkills Tab Display
		</>
	);
}

export default SubSkillsTabDisplay;