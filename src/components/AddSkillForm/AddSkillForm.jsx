import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";


function AddSkillForm({handleAddSkill}) {
    const [skillInfo, setSkillInfo] = useState({
        name: "",
        type: "",
    })

    function handleChange(e) {
        setSkillInfo({
          ...state,
          [e.target.name]: e.target.value,
        });
      }

    function handleSubmit(e){
        e.preventDefault();
    }



    return (
      <Segment>
        <Form autoComplete='off' onSubmit={handleSubmit}>
          <Form.Input
            className="form-control"
            name="name"
            value={skillInfo.name}
            placeholder="Enter Skill Name"
            onChange={handleChange}
            required
          />
          <Form.Input
            className="form-control"
            name="type"
            value={skillInfo.type}
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

export default AddSkillForm;