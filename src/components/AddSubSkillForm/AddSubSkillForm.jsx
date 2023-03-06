import { useState, useContext} from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

export default function AddSubSkillForm({ skill, handleClose}) {
	const ctx = useContext(SkillsContext);
	
	const handleCreateSubSkill = ctx.handleCreateSubSkill;

	const [state, setState] = useState({
			title: "",
			details: "",
	parentSkill: ''
	});

	function handleChange(e) {
			setState({
				...state,
				[e.target.name]: e.target.value
			})
	}

	function handleSubmit(e) {
		e.preventDefault()
		state.parentSkill = skill;
		handleClose();
		handleCreateSubSkill(state)
	}
	
	return (
		<Segment  >

			<Form onSubmit={handleSubmit} >
				<Form.Input
					className="form-control"
					name="title"
					value={state.title}
					placeholder="SubSkill title"
					onChange={handleChange}
				/>
				<Form.Input
					className="form-control"
					name="details"
					value={state.details}
					placeholder="Subskill details"
					onChange={handleChange}
					/>
				<Button fluid color='green' type="submit" className="btn"> Add Subskill</Button>
			</Form>
		</Segment>
	)
}