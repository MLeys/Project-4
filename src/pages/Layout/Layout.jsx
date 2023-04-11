import { Outlet } from "react-router-dom";
import { useEffect, useContext} from "react";
import Container from '@mui/material/Container';

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';


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
    </Container> 
  )
}

export default Layout;