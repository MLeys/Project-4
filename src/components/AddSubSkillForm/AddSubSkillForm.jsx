import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";


export default function AddSubSkillForm({ handleAddSkill }) {
    const [state, setState] = useState({
        name: "",
        details: "",
    })

    function handleChange(e) {
		console.log(e.target.name, "e.target.name in handleChange in AddSubSkillform")
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
		// console.log(state, " <<<UPDATED STATE FROM HANDLE CHANGE")
      }

    function handleSubmit(e) {
		e.preventDefault();
	
		console.log(state, "<___<<<<<<<< state in handleSubmit Subskillform")
		handleAddSkill(state);
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
			placeholder="Details"
			onChange={handleChange}
		/>
		<Button type="submit" className="btn">
			Add SubSkill
		</Button>

		</Form>
	</Segment> 

  );
}


