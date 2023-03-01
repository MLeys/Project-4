import { useState, useEffect } from 'react';

import { 
    Segment,
    Card,
    Button,
    Form,
} from 'semantic-ui-react';

import * as youTubeApi from "../../utils/youTubeApi.js"
import ResourceCard from '../ResourceCard/ResourceCard.jsx';




function SearchYouTube({skill, liftYouTubeSearchResults}) {
  const [state, setState] = useState({
    search: "",
  })
  const [searchYT, setSearchYT] = useState('');
  const [videoId, setVideoId] = useState('');
  const [resultSearchYT, setResultSearchYT] = useState([]);


  function liftResults() {
    (resultSearchYT) ? liftYouTubeSearchResults(resultSearchYT) : '';
  }

  async function searchYouTube(search) {
    console.log('start search funct')
    try {
      const response = await youTubeApi.searchYouTube(search);
      console.log(response, " <------ response from YOUTUBE SEARCH");
      return await response
    } catch (err) {
      console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
    }
  }
  

  function handleChange(e){
    setSearchYT(e.target.value)
  }


  async function handleSubmit(e) {
    
    e.preventDefault();
    try {
      const videoInfo = await searchYouTube(searchYT);
      setResultSearchYT([...videoInfo])
     
    } catch(err) {
      console.log(err, "<<!! ERROR submitting resource search")
    }

  }


  useEffect(() => {
    liftResults();
  }, [resultSearchYT]);  



  return (
    <Segment.Group>
      {/* <Segment>Resource Display</Segment>
      <Segment>VideoID {videoId}</Segment> */}
      <Segment>
        <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="search"
          value={searchYT}
          onChange={handleChange}
          placeholder={skill.name}
          
        />
        <Button type="submit" className="btn">
          Add Skill
        </Button>

        </Form>
      </Segment>
      <Segment>
        <Card.Group>
          <ResourceCard resultSearchYT={resultSearchYT} skill={skill} />
        </Card.Group>
      </Segment>
    </Segment.Group>

  );
}

export default SearchYouTube;