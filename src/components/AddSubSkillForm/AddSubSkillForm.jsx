import { useState } from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";


export default function AddSubSkillForm({ handleAddSubSkill, skill, handleClose}) {
    const [state, setState] = useState({
        title: "",
        details: "",
		parentSkill: ''
    });

    function handleChange(e) {
		// console.log(e.target.name, "e.target.name in handleChange in AddSubSkillform")
        setState({
          ...state,
		//   title: e.target.title,
		//   details: state.details
          [e.target.name]: e.target.value
        })
    }
	function handleSubmit(e) {
		e.preventDefault()
		// console.log(state, "BEFOPRE STATE")
		// setState(
		// 	parentSkill = skill
		// )
		state.parentSkill = skill
		
		// console.log(state, " STATE HERE STATE ASTATE")
		// console.log(skill, " NEW SKILL WITH SUB")
		handleAddSubSkill(state)
	}
	
	return (
		<Segment>

			<Form onSubmit={handleSubmit}>
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