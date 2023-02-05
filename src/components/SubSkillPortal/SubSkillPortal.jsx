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

import * as skillsApi from '../../utils/skillApi'

import AddSubSkillForm from "../AddSubSkillForm/AddSubSkillForm.jsx";

function SubSkillPortal({handleAddSubSkill, skill}) {
    const [subFormPop, setSubFormPop] = useState(false)

    const open = subFormPop;
    // console.log(open, "< ---Open State")

    function handleOpen() {
        setSubFormPop(true)
    }

    function handleClose() {
        setSubFormPop(false)
    }

    // console.log(allSkills, "<<<<<< ALLLA")
    const { skillName } = useParams();
    // const preSkill = allSkills?.filter((s) =>{
    //     return s.name === skillName
    // } )
    // const skill = preSkill;
    
    // console.log(skill[0], "<<SKILL>><<<<<<>><<<")

    // const result = allSkills?.find(({ name }) => name === skillName);
    // console.log(result, "^^^ Find RESULT SubSkillPortal"); 
    useEffect(() => {
        
      }, []); 

    return (  
        <div>
            <Label
                corner
                color="green" 
                as='a' 
                icon='plus' 
                size="mini" 
                
                disabled={subFormPop}
                positive
                onClick={handleOpen} />

            
                            {/* <Button
                    fluid
                    icon
                    disabled={subFormPop}
                    positive
                    onClick={handleOpen}
                >
                    <Icon name="plus" />
                </Button> */}

            
            <Portal onClose={handleClose} open={open}>
                <Segment inverted
                    style={{
                        left: '35%',
                        position: 'fixed',
                        top: '25%',
                        
                }}
                >
                    <Header>Add Subskill</Header>
                <Label
                    attached='top right'
                    color="red" 
                    as='a' 
                    icon='close' 
                    size="mini" 
                    negative
                    onClick={handleClose} 
                />
                    <AddSubSkillForm handleClose={handleClose} skill={skill} handleAddSubSkill={handleAddSubSkill} />
                        {/* <Button
                            content='Close Portal'
                            negative
                            onClick={handleClose}
                        /> */}
                </Segment>
            </Portal>

        </div>
    );
}

export default SubSkillPortal;
