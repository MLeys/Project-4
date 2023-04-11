import * as React from 'react';

import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';


export default function CloseButton({close}) {

  return (
    <Zoom
      key={'closeFloat'}
      in={true}
      timeout={900}
      style={{
        transitionDelay: '1s',
      }}
      unmountOnExit
    >
      <Fab color="accent" aria-label="close" 
        sx={{ position: 'absolute', top: 0, right: 0}}
        onClick={() => close()}
      >
        <div>{` Close X `}</div>
      </Fab>
    </Zoom>
  );
}
