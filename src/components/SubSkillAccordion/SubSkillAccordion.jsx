import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

function handleSubSkillClick(e, subSkill, loggedUser) {
    e.stopPropagation();
    e.preventDefault();
    // check if the current user is already assigned to this subskill
    const isAssigned = subSkill.usersAssigned.some(user => user._id === loggedUser._id);
    // if the user is already assigned, unassign them, otherwise assign them

    if (isAssigned) {
      subSkill.usersAssigned = subSkill.usersAssigned.filter(user => user._id !== loggedUser._id);
    } else {
      subSkill.usersAssigned.splice(0,0,loggedUser);
    }
    setSkills([...skills]);
  };

function SubSkillAccordion({skill}) {
  const ctx = useContext(SkillsContext);
  const loggedUser = ctx.loggedUser;
  
    return (  
        <Accordion styled>
        {skill.subSkills.map((subSkill, index) => (
          <div key={`${skill._id}-subSkillIdx-${index}`} onClick={(e) => handleSubSkillClick(e, subSkill, loggedUser)}>
            <Accordion.Title active={false}>
              <Icon name="dropdown" />
              {subSkill.title}
              {subSkill.usersAssigned.some(user => user._id === loggedUser._id) ? (
                <Button compact size="mini" color="red" floated="right" onClick={(e) => {
                  e.stopPropagation();
                  subSkill.usersAssigned = subSkill.usersAssigned.filter(user => user._id !== loggedUser._id);
                  setSkills([...skills]);
                }}>
                  Unassign
                </Button>
              ) : (
                <Button compact size="mini" color="green" floated="right" onClick={(e) => {
                  e.stopPropagation();
                  subSkill.usersAssigned.push(loggedUser);
                  setSkills([...skills]);
                }}>
                  Assign
                </Button>
              )}
            </Accordion.Title>
            <Accordion.Content>
              <p>{subSkill.details}</p>
              <ul>
                {subSkill.resources.map((resource, index) => (
                  <li key={`resourceAccordian-${resource._id}-${index}`}>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.name}</a>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    );
}

export default SubSkillAccordion;