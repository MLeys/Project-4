import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import {
		Grid,
		Segment,
		Header,
		Button,
		Icon,
		Portal,
		Label

} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import AddResourceForm from "../AddResourceForm/AddResourceForm.jsx"

function ResourcePortal() {
	const [formPop, setFormPop] = useState(false)
	const handleAddSkill = useContext(SkillsContext).createSkill

	const open = formPop;

	function handleOpen() {
		setFormPop(true)
	}

	function handleClose() {
		setFormPop(false)
	}

	useEffect(() => {
			
	}, []); 

	return (  
		<>
			
			<Label
				attached="top"
				content='Add Resource'
				color="green" 
				as={Button} 
				icon='plus' 
				size="mini" 
				
				disabled={formPop}
				positive="true"
				onClick={handleOpen} 
			/>
					
			<Portal onClose={handleClose} open={open}>
				<Segment 
					inverted={true}
					floated='right'
					
					style={{
							left: '30%',
							position: 'fixed',
							top: '25%',
					}}
				>
					<Header>Add Resource</Header>
					<Label
						attached='top right'
						color="red" 
						as='a' 
						icon='close' 
						size="mini" 
						onClick={handleClose} 
					/>
					<AddResourceForm handleClose={handleClose} />

				</Segment>
			</Portal>

		</>
	);
}

export default ResourcePortal;
