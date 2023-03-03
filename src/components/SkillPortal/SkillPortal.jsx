import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import {
    Grid,
    Segment,
    Header,
    Button,
    Icon,
    Portal,
    Label

} from 'semantic-ui-react';

import SkillsReducer from "../../reducers/SkillsReducer";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import AddSkillForm from "../AddSkillForm/AddSkillForm";

function SkillPortal({ skill}) {
    const [formPop, setFormPop] = useState(false)
    const handleAddSkill = useContext(SkillsContext).createSkill

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
                attached="top right"
                content='Add Skill'
                color="green" 
                as='a' 
                icon='plus' 
                size="mini" 
                
                disabled={formPop}
                positive="true"
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
                    <AddSkillForm handleClose={handleClose} />

                </Segment>
            </Portal>

        </div>
    );
}

export default SkillPortal;
