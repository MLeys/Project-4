import React, { useState, useEffect } from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';

import SkillAccordion from '../SkillAccordion/SkillAccordion';


function SidebarAccordion({allSkills, currentUser }) {
    return ( 
        <SkillAccordion allSkills={allSkills}  currentUser={currentUser}/>
     );
}

export default SidebarAccordion;