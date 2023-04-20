import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import ModalFullScreen from '../ModalFullScreen/ModalFullScreen';
import SearchResultsDisplay from '../SearchResultsDisplay/SearchResultsDisplay';
import { Typography } from '@mui/material';


export default function SearchForm({onSubmit}) {
  const ctx = useContext(SkillsContext);
  const skillName = ctx.activeSkill?.skill?.name;
  const subSkillName = ctx.activeSub?.subSkill?.title;
  const searchYouTube = ctx.searchYouTube;

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmit(e) {
    handleOpen
    e.preventDefault();
    searchYouTube(search);
  }

  return (
    <Box sx={{ bgcolor: 'blueGrayLight.main', alignItems: "center", borderRadius: 2, border: '2px inset black' }}>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="With normal TextField"
          variant="standard"
          sx={{ color: "pink", m: 0, p: 0, width: '100%' }}
        >
          <TextField
            color="secondary"
            label={`Find videos for ${skillName} - ${subSkillName}`}
            id="filled-start-adornment"
            sx={{ width: "100%", bgcolor: "primaryDarker.main" }}
            InputProps={{

              style: { color: "white" },
            }}
            variant="filled"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </FormControl>
        <Button 
          color="accent" 
          sx={{ backgroundColor: "black",width: "100%",height: "30px", borderRadius: 0}}
          type="submit"
          onClick={handleOpen}
        > 
          Search
        </Button>
        <ModalFullScreen open={open} handleClose={handleClose}>
            <SearchResultsDisplay handleClose={handleClose}/>
        </ModalFullScreen>
      </form>
    </Box>
  );
}
