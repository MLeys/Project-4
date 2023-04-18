import { Outlet } from "react-router-dom";
import { useEffect, useContext} from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2.js";
import Toolbar from '@mui/material/Toolbar';

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';

function Layout() {
  const ctx = useContext(SkillsContext)
  const getSkills = ctx.getSkills;

  useEffect(() => {
  }, []); 

  return (
    <Grid container  >
      <Toolbar />
      <FixedMenuHeader >
      
        <Outlet />
      </FixedMenuHeader>
    </Grid> 
  )
}

export default Layout;