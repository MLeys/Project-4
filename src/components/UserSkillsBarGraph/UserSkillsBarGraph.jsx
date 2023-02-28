import React, { useState, useEffect } from 'react';
import {
	 Button, 
	 Icon,
	 Segment,
	 Label,
	 Menu
} from 'semantic-ui-react';
import SkillProgressBar from '../SkillProgressBar/SkillProgressBar';



function UserSkillsBarGraph({ userSkills }) {
    return ( 
        userSkills.map((skill) => {
           
            return (<>
               
                <SkillProgressBar skill={skill} />
            </>)
        })
        
     );
}

export default UserSkillsBarGraph;