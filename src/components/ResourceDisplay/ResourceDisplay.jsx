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




function ResourceDisplay({skill, youTubeSearchResults, liftYouTubeSearchResults}) {


  return (
    <Segment.Group>

        <Card.Group>
          <ResourceCard
            skill={skill}
            liftYouTubeSearchResults={liftYouTubeSearchResults}
            youTubeSearchResults={youTubeSearchResults}
          />
        </Card.Group>
  
    </Segment.Group>

  );
}

export default ResourceDisplay;