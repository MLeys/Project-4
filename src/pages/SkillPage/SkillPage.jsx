import { useParams, Link } from "react-router-dom";
import { useState, useEffect, Component } from "react";

import {
    Grid,
    Segment,
    Header,
    Button,
    Icon,
    Portal

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'

import AddSubSkillForm from "../../components/AddSubSkillForm/AddSubSkillForm2.jsx";



function SkillPage({currentSkill, allSkills}) {
    const [subFormPop, setSubFormPop] = useState(false)

    const open = subFormPop;
    console.log(open, "< ---Open State")

    function handleOpen() {
        setSubFormPop(true)
    }

    function handleClose() {
        setSubFormPop(false)
    }

    console.log(allSkills, 'AAAAAALLLL SKILLLLLS')
    const { skillName } = useParams();
    let skill = allSkills.filter((s) =>{
        return s.name === skillName
    } )
    console.log(skillName, "<-- skillName from useParams") 



    useEffect(() => {
        
      }, []); 


    return (  
        <>
            <Button
                content='Open Portal'
                disabled={subFormPop}
                positive
                onClick={handleOpen}
            />
            <Portal onClose={handleClose} open={open}>
                <Segment
                    style={{
                        left: '40%',
                        position: 'fixed',
                        top: '50%',
                        
                }}
                >
                    <Header>This is a controlled portal</Header>
                    <p>Portals have tons of great callback functions to hook into.</p>
                    <p>To close, simply click the close button or click away</p>

                    <Button
                        content='Close Portal'
                        negative
                        onClick={handleClose}
                    />
                </Segment>
            </Portal>
            <h1>Skill Page - {skill[0]?.name} </h1>

            <Button icon labelpostition='right' >
                <Link to={`subskill`}>
                    <Icon name='plus' />
                    
                </Link>
            </Button>
        </>
    );
}

export default SkillPage;
