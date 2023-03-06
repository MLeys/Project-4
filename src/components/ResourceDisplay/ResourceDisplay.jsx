import { useState, useEffect } from 'react';

import { 
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form,
    Embed,
    SegmentGroup


} from 'semantic-ui-react';

import ResourceCard from '../ResourceCard/ResourceCard.jsx';

function ResourceDisplay({
}) {


  useEffect(() => {
    
  }, []); 

  return (
    <Segment.Group>

        <Card.Group>
          <ResourceCard

          />
        </Card.Group>
  
    </Segment.Group>
    

  );
}

export default ResourceDisplay;