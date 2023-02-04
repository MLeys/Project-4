import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";


export default function AddSubSkillForm({ handleAddSubSkill, skill }) {
    const [state, setState] = useState({
        name: "",
        details: ""
    });

    function handleChange(e) {
		// console.log(e.target.name, "e.target.name in handleChange in AddSubSkillform")
        setState({
          ...state,
          [e.target.name]: e.target.value
        })
    }
	function handleSubmit(e) {
		e.preventDefault()
		skill.subSkill.push(state)
		console.log(skill, " NEW SKILL WITH SUB")
		handleAddSubSkill({skill})
	}
	
	return (
		<Segment>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					className="form-control"
					name="name"
					value={state.name}
					placeholder="SubSkill Name"
					onChange={handleChange}
				/>
				<Form.Input
					className="form-control"
					name="details"
					value={state.details}
					placeholder="Subskill details"
					onChange={handleChange}
					/>
				<Button type="submit" className="btn"> Add Subskill</Button>
			</Form>
		</Segment>

	)
}