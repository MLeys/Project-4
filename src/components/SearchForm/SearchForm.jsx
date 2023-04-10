import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import SearchResultsModal from '../SearchResultsModal/SearchResultsModal';


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

    return (
      <SearchResultsModal />
    )
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="With normal TextField"
          variant="standard"
          sx={{ color: "black", m: 0, p: 0 }}
        >
          <TextField
            color="secondary"
            label={`Search YouTube for resources on ${skillName} - ${subSkillName}`}
            id="filled-start-adornment"
            sx={{ m: 1, width: "40ch", bgcolor: "primaryDarker.main" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Enter Keywords:
                </InputAdornment>
              ),
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
          sx={{ p: 0, mt: 1,backgroundColor: "black",width: "20px",height: "55px"}}
          type="submit"
          onClick={handleOpen}
        > 
          Go
        </Button>
        <SearchResultsModal open={open} handleClose={handleClose}/>
      </form>
    </Box>
  );
}
