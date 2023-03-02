import { useState } from 'react';
import { useSkills, useSkillsDispatch } from '../../context/SkillsContext/SkillsContext';
import { 
  Accordion,
  Menu,
  Segment,
  Button

} from 'semantic-ui-react';

import "./SkillList.css"

export default function SkillList() {
  const skills = useSkills();
  return (
    <ul>
      {skills?.map(skill => (
        <li key={skill.id}>
          <Skill skill={skill} />
        </li>
      ))}
    </ul>
  );
};

function Skill({ skill }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useSkillsDispatch();
  let skillContent;
  if (isEditing) {
    skillContent = (
      <>
        <input
          value={skill.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              skill: {
                ...skill,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    skillContent = (
      <>
        {skill.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={skill.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            skill: {
              ...skill,
              done: e.target.checked
            }
          });
        }}
      />
      {skillContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: skill.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
