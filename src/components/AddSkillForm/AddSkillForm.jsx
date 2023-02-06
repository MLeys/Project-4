import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";


export default function AddSkillForm({ handleAddSkill, handleClose}) {
    const [state, setState] = useState({
        name: "",
        type: "",
    })

    function handleChange(e) {
		console.log(e.target.name, "e.target.name in handleChange in Addskillform")
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
		// console.log(state, " <<<UPDATED STATE FROM HANDLE CHANGE")
      }

    function handleSubmit(e) {
		e.preventDefault();
	
		console.log(state, "<___<<<<<<<< state in handleSubmit")
		handleAddSkill(state);
		handleClose();
	}
    
  return (
	
	<Segment>
		<Form onSubmit={handleSubmit}>
		<Form.Input
			className="form-control"
			name="name"
			value={state.name}
			placeholder="Enter Skill Name"
			onChange={handleChange}
			
		/>
		<Form.Input
			className="form-control"
			name="type"
			value={state.type}
			placeholder="Enter Type of Skill"
			onChange={handleChange}
		/>
		<Button type="submit" className="btn">
			Add Skill
		</Button>

		</Form>
	</Segment> 

  );
}


