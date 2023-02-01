import PageHeader from "../../components/PageHeader/PageHeader";
import { getSkills } from '../../utils/chatGPT3Api'

const skills = await getSkills()
console.log(skills)


function LandingPage({loggedUser}) {
    console.log(loggedUser)
    return (
        <>
            
            <h1>LandingPage for all general info</h1> 
        </>
        
    
    
    
    
    );
}

export default LandingPage;