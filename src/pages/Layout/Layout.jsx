import { Outlet } from "react-router-dom";
import { useEffect, useContext} from "react";
import Container from '@mui/material/Container';



import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainFooter from '../../components/MainFooter/MainFooter';


function Layout({ handleLogout }) {
  const ctx = useContext(SkillsContext)
  const getSkills = ctx.getSkills;



  useEffect(() => {
    getSkills();
  }, []); 

  return (
    <Container fluid='true' style={{margin: 0, padding: 0}}>

  
    <FixedMenuHeader handleLogout={handleLogout} />


          
          <Outlet />

      <MainFooter />
    </Container> 
  )
}

export default Layout;