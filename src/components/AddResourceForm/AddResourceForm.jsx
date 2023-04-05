import { useState } from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";


export default function AddResourceForm({ handleAddSubSkill, skill, handleClose}) {
	
    const [state, setState] = useState({
        title: "",
		// subSkill: "",
		videoId: "",
        // details: "",
		parentSkill: "",
    });

    function handleChange(e) {
        setState({
          ...state,
          [e.target.name]: e.target.value
        })
    }
	function handleSubmit(e) {
		e.preventDefault();
		state.subSkill = s
		state.parentSkill = skill;
		handleClose();
	
		handleAddSubSkill(state)
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
				<Button fluid color='green' type="submit" className="btn"> </Button>
			</Form>
		</Segment>
	)
}