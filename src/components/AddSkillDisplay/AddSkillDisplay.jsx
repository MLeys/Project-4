import React from "react";
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

import SkillsReducer from "../../reducers/SkillsReducer";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import AddSkillForm from "../AddSkillForm/AddSkillForm";

function AddSkillDisplay() {
	const [formPop, setFormPop] = useState(false)
	const handleAddSkill = useContext(SkillsContext).createSkill

	const open = formPop;

	function handleOpen() {
		setFormPop(true)
	}

	function handleClose() {
		setFormPop(false)
	}


	return (  
		<>
			<Button
				attached='top'
				fluid={true}
				content='Add Skill'
				color="green" 
				icon='plus' 
				size="large" 
				
				disabled={formPop}
				positive={true}
				onClick={handleOpen} 
			/>
		
			<Portal onClose={handleClose} open={formPop}>
				<Segment 
					inverted
					style={{
							left: '30%',
							position: 'fixed',
							top: '25%',
					}}
				>
					<Header>Add Skill</Header>
					<Label
						attached='top right'
						color="red" 
						as='a' 
						icon='close' 
						size="mini" 
						onClick={handleClose} 
					/>
					<AddSkillForm handleClose={handleClose} />

					</Segment>
			</Portal>
		</>
	);
}

export default AddSkillDisplay;
