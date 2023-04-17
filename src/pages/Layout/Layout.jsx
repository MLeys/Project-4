import { Outlet } from "react-router-dom";
import { useEffect, useContext} from "react";
import Container from '@mui/material/Container';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2.js";

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';

function Layout({ handleLogout }) {
  const ctx = useContext(SkillsContext)
  const getSkills = ctx.getSkills;

  useEffect(() => {
  }, []); 

  return (
    <Grid2 container sx={{margin: 0, padding: 0, minHeight: '100dvh'}} bgcolor={'tealGray.light'} >
      <FixedMenuHeader />
      <Outlet />
    </Grid2> 
  )
}

export default Layout;