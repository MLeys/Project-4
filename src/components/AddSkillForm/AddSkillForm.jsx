import React, { useState } from 'react';

function AddSkillForm() {
  const [skill, setSkill] = useState({ name: '', type: '', subSkills: [] });
  const [subSkillInput, setSubSkillInput] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSkill({ ...skill, [name]: value, type: value });
  }

  function handleSubSkillInputChange(event) {
    setSubSkillInput(event.target.value);
  }

  function addSubSkill(event) {
    event.preventDefault();
    if (subSkillInput.trim()) {
      setSkill({ ...skill, subSkills: [...skill.subSkills, subSkillInput] });
      setSubSkillInput('');
    }
  }

  function removeSubSkill(index) {
    const updatedSubSkills = skill.subSkills.filter((_, i) => i !== index);
    setSkill({ ...skill, subSkills: updatedSubSkills });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('New Skill:', skill);
    // Call the API to save the new Skill with subskills
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Skill Name:
        <input
          type="text"
          name="name"
          value={skill.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Subskill:
        <input
          type="text"
          name="subSkill"
          value={subSkillInput}
          onChange={handleSubSkillInputChange}
        />
      </label>
      <button onClick={addSubSkill}>Add Subskill</button>
      <ul>
        {skill.subSkills.map((subSkill, index) => (
          <li key={index}>
            {subSkill}{' '}
            <button onClick={() => removeSubSkill(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button type="submit">Save Skill</button>
    </form>
  );
}

export default AddSkillForm;
