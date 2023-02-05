import "./SubSkillCard.css"
import { Link } from "react-router-dom";
import { 
    Card, 
    Icon, 
    Image, 
    Button,
    Accordion,
    Segment
} from "semantic-ui-react";

// const level1Panels = [
//     { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },// resources
//     { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' },
//   ]
  
//   const Level1Content = (
//     <div>
//       Welcome to level 1
//       <Accordion.Accordion panels={level1Panels} />
//     </div>
//   )
//   const rootPanels = [
//     { key: 'panel-1', title: 'Level 1', content: { content: Level1Content } }, // each subskill
//     { key: 'panel-2', title: 'Level 2', content: { content: Level2Content } },
//   ]
//   const AccordionExampleNested = () => (
//     <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
//   )


export default function SubSkillCard({ subSkills }) {
    // const subSkills = skill?.subSkills
    // console.log(subSkills, "subskills new array")



    return (
        <>
        {
        subSkills?.map(sub => {
            return (
                <div>
                <Card fluid key={sub?._id}>
                    <Card.Content> 
                        {sub?.title}
                    </Card.Content>
                </Card>
                </div>

            )
        })
        }
        
        </>
    )
    
}
