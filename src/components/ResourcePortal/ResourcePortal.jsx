import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import {
		Grid,
		Segment,
		Header,
		Button,
		Icon,
		Portal,
		Label,
		Container

} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import AddResourceForm from "../AddResourceForm/AddResourceForm.jsx"
import SearchYouTube from "../SearchYouTube/SearchYouTube";

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
				content='Add Resource'
				color="green" 
				attached='top'
				icon='plus' 
				size="small" 
				
				disabled={formPop}
				onClick={handleOpen} 
			/>
			

					
			<Portal onClose={handleClose} open={open}>
				<Segment.Group
					style={{
						width: "80%",
						height: "75%",
						left: '15%',
						position: 'fixed',
						top: '17%',	
					}}
				>
					<Segment attached='top'>
						<Header
							size="huge" 
							textAlign="center"	
							content="Search for Resources to Add"
						/>
							<Label
								attached='top right'
								color="red" 
								as={Header} 
								icon='close' 
								size="mini" 
								onClick={handleClose} 
								content=' Close'
							/>
					</Segment>
					<Segment>
						<SearchYouTube handleClose={handleClose} />
						{/* <AddResourceForm handleClose={handleClose} /> */}
					</Segment>
			</Segment.Group>
		</Portal>
			


		</>
	);
}

export default ResourcePortal;
