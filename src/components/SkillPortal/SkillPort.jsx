import { useParams, Link } from "react-router-dom";
import { useState, useEffect, Component } from "react";

import {
    Grid,
    Segment,
    Header,
    Button,
    Icon,
    Portal,
    Label

} from 'semantic-ui-react';

import AddSkillForm from "../AddSkillForm/AddSkillForm";

function SkillPortal({handleAddSkill, skill}) {
    const [formPop, setFormPop] = useState(false)

    const open = formPop;

    function handleOpen() {
        setFormPop(true)
    }

    function handleClose() {
        setFormPop(false)
    }

    const { skillName } = useParams();

    useEffect(() => {
        
      }, []); 

    return (  
        <div>
            <Label
                corner='left'
                color="green" 
                as='a' 
                icon='plus' 
                size="mini" 
                
                disabled={formPop}
                positive
                onClick={handleOpen} 
            />
            
            <Portal onClose={handleClose} open={open}>
                <Segment inverted
                    style={{
                        left: '30%',
                        position: 'fixed',
                        top: '25%',
                        
                }}
                >
                    <Header>Add Skill</Header>
                <Label
                    attached='top right'
                    color="red" 
                    as='a' 
                    icon='close' 
                    size="mini" 
                    negative
                    onClick={handleClose} 
                />
                    <AddSkillForm handleClose={handleClose} skill={skill} handleAddSkill={handleAddSkill} />

                </Segment>
            </Portal>

        </div>
    );
}

export default SkillPortal;
