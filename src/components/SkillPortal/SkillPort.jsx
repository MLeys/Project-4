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

function SkillPortal({handleAddSubSkill, skill}) {
    const [subFormPop, setSubFormPop] = useState(false)

    const open = subFormPop;
    // console.log(open, "< ---Open State")

    function handleOpen() {
        setSubFormPop(true)
    }

    function handleClose() {
        setSubFormPop(false)
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
                
                disabled={subFormPop}
                positive
                onClick={handleOpen} 
            />
            
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

export default SkillPortal;
