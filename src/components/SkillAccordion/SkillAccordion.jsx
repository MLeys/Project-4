import React, { useState, useEffect } from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';

function SkillAccordion({ allSkills, currentUser }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(allSkills);
  }, [allSkills]);

  const handleSubSkillClick = (e, subSkill) => {
    e.stopPropagation();
    e.preventDefault();
    // check if the current user is already assigned to this subskill
    const isAssigned = subSkill.usersAssigned.some(user => user._id === currentUser._id);
    // if the user is already assigned, unassign them, otherwise assign them
    if (isAssigned) {
      subSkill.usersAssigned = subSkill.usersAssigned.filter(user => user._id !== currentUser._id);
    } else {
      subSkill.usersAssigned.push(currentUser);
    }
    setSkills([...skills]);
  };

  const handleSkillClick = (e, index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <Accordion styled>
      {skills.map((skill, index) => (
        <div key={skill._id}>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={(e) => handleSkillClick(e, index)}
          >
            <Icon name="dropdown" />
            {skill.name}
            {skill.usersAssigned.some(user => user._id === currentUser._id) ? (
              <Button compact size="mini" color="red" floated="right" onClick={() => {
                skill.usersAssigned = skill.usersAssigned.filter(user => user._id !== currentUser._id);
                setSkills([...skills]);
              }}>
                Unassign
              </Button>
            ) : (
              <Button compact size="mini" color="green" floated="right" onClick={() => {
                skill.usersAssigned.push(currentUser);
                setSkills([...skills]);
              }}>
                Assign
              </Button>
            )}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <Accordion styled>
              {skill.subSkills.map((subSkill) => (
                <div key={subSkill._id} onClick={(e) => handleSubSkillClick(e, subSkill)}>
                  <Accordion.Title active={false}>
                    <Icon name="dropdown" />
                    {subSkill.title}
                    {subSkill.usersAssigned.some(user => user._id === currentUser._id) ? (
                      <Button compact size="mini" color="red" floated="right" onClick={(e) => {
                        e.stopPropagation();
                        subSkill.usersAssigned = subSkill.usersAssigned.filter(user => user._id !== currentUser._id);
                        setSkills([...skills]);
                      }}>
                        Unassign
                      </Button>
                    ) : (
                      <Button compact size="mini" color="green" floated="right" onClick={(e) => {
                        e.stopPropagation();
                        subSkill.usersAssigned.push(currentUser);
                        setSkills([...skills]);
                      }}>
                        Assign
                      </Button>
                    )}
                  </Accordion.Title>
                  <Accordion.Content>
                    <p>{subSkill.details}</p>
                    <ul>
                      {subSkill.resources.map((resource) => (
                        <li key={resource._id}>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.name}</a>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </div>
              ))}
            </Accordion>
					</Accordion.Content>
				</div>
			))}
		</Accordion>
	)
}
export default SkillAccordion;
					
                        

