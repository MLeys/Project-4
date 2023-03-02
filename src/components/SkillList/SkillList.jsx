import { useContext, useState } from 'react';
import { 
  Accordion,
  Menu,
  Segment,
  Button

} from 'semantic-ui-react';

import "./SkillList.css"

import { SkillsContext, SkillsDispatchContext } from "../../context/SkillsContext/SkillsContext";

function SkillList() {
  const skills = useContext(SkillsContext).skills
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

export default SkillList;

function Skill({ skill }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(SkillsDispatchContext);
  let skillContent;
  if (isEditing) {
    skillContent = (
      <>
        <input
          value={skill.name}
          onChange={e => {
            dispatch({
              type: 'updateSkill',
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
            type: 'updateSkill',
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
          type: 'deleteSkill',
          id: skill.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}











// =================================================================================
// import React from 'react'
// import { Link, useNavigate} from "react-router-dom";
// import { 
//   Button, 
//   Image, 
//   List,
//   Menu,
//   Label,
//   Icon,
  

// } from 'semantic-ui-react'
// import SkillPortal from '../SkillPortal/SkillPortal';

// function SkillList({skill, handleDeleteSkill, handleAddSkill}) {
//   const navigate = useNavigate();
//   const clickHandler = () =>  handleDeleteSkill(skill._id)
  
//   return ( 
//     <Menu.Item>
//       <Label color='red' as='a'>
//         <Icon name='delete' key={skill._id} onClick={() => clickHandler() }/>
//       </Label>
//       {skill.name}
//     </Menu.Item>
//    );
   
// }

// export default SkillList;

// ===========================================================================