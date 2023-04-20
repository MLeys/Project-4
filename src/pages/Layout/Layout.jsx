import { Outlet } from "react-router-dom";
import { useEffect, useContext} from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2.js";
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';

function Layout() {
  const ctx = useContext(SkillsContext)
  const getSkills = ctx.getSkills;

  useEffect(() => {
  }, []); 

  return (
    <Box width={'100dvw'} minHeight={'100dvh'} bgcolor={'blueGray.light'} >
      <Toolbar />
      <FixedMenuHeader >
        <Outlet />
      </FixedMenuHeader>
    </Box> 
  )
}

export default Layout;