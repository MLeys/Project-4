import { useState } from 'react';

import { 
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form,
    Embed


} from 'semantic-ui-react';

import * as youTubeApi from "../../utils/youTubeApi.js"

async function searchYouTube(search) {
    
    try {
      const response = await youTubeApi.searchYouTube(search);
      console.log(response, " <------ response from YOUTUBE SEARCH");
      return await response
    } catch (err) {
      console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
    }
}







function ResourceDisplay({skill}) {
  const [state, setState] = useState({
    search: "",
  })

  const [videoId, setVideoId] = useState('')

  // function handleChange(e) {
  //   console.log(e.target.name, "e.target.name in handleChange in Addskillform")
  //   setState({
  //     ...state,
  //     [e.target.search]: e.target.value,
  //   });
  //   console.log(state, " <<<UPDATED STATE resource")
  // }
  
  async function handleSubmit(e) {
    let videoInfo = '';
    e.preventDefault();
    try {
      console.log(state, "<___<<<<<<<< state in handleSubmit")
      videoInfo =  await searchYouTube(skill.name);
      await setVideoId(videoInfo.items[0].id.videoId)
      console.log(videoId, "<-VID ID")
    } catch(err) {
      console.log(err, "<<!! ERROR submitting resource search")
    }
  

      
  }




  return (
    <Segment.Group>
      <Segment>Resource Display</Segment>
      <Segment>VideoID {videoId}</Segment>
      <Segment>
        <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="search"
          value={skill.name}
          placeholder={skill.name}
          
        />
        <Button type="submit" className="btn">
          Add Skill
        </Button>

        </Form>
      </Segment> 
        
      <Embed
        id={videoId}
        
        source='youtube'
      />
        

        
    </Segment.Group>

  );
}

export default ResourceDisplay;