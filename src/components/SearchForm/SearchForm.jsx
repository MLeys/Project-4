import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


export default function SearchForm() {
  const [search, setSearch] = useState('');


  return (
    <FormControl label="With normal TextField" variant="standard" sx={{color: 'black', m: 0, p: 0}}>
      <TextField
        color='secondary'
        label={`Search YouTube for resources on SKILL - SUBSKILLS`}
        id="filled-start-adornment"
        sx={{ m: 1, width: '50ch', bgcolor: 'primaryDarker.main' }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Enter Keywords:</InputAdornment>,
          style: {color: 'white'}
        }}
   
        variant="filled"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </FormControl>

  );
}
