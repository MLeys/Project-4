import { useState, useEffect } from 'react';

import { 
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form,
    Embed


} from 'semantic-ui-react';

import SearchResources from '../SearchResources/SearchResources.jsx';
import * as youTubeApi from "../../utils/youTubeApi.js"









function ResourceDisplay({skill}) {
  const [state, setState] = useState({
    search: "",
  })
  const [searchYT, setSearchYT] = useState('');
  const [videoId, setVideoId] = useState('');
  const [resultSearchYT, setResultSearchYT] = useState([]);



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
  // function handleChange(e) {
  //   console.log(e.target.name, "e.target.name in handleChange in Addskillform")
  //   setState({
  //     ...state,
  //     [e.target.search]: e.target.value,
  //   });
  //   console.log(state, " <<<UPDATED STATE resource")
  // }
  
  function handleChange(e){
    setSearchYT(e.target.value)
  }


  async function handleSubmit(e) {
    
    e.preventDefault();
    try {
      const videoInfo = await searchYouTube(searchYT);
      setResultSearchYT([...videoInfo])
     
      
        // .then(videoInfo => {
        //   const videos = videoInfo.items.map(item => {
        //     const video = {
        //         videoId: item.id.videoId,
        //         title: item.snippet.title,
        //         description: item.snippet.description,
        //         thumbnails: item.snippet.thumbnails.default.url,
        //         publishTime: item.snippet.publishTime
        //     }
        //     return video
        // })
        // console.log(`Videos Result(API): ${videos}`)
        // return videos
    
        // }).catch(err => {
        //   console.error(err)
        // })
        

    } catch(err) {
      console.log(err, "<<!! ERROR submitting resource search")
    }

  }
  async function consolelogResult() {
    try {
      console.log(`LOG RESULT: ${resultSearchYT}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
   
  }, []);  



  return (
    <Segment.Group>
      <Segment>Resource Display</Segment>
      <Segment>VideoID {videoId}</Segment>
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
        
      <Embed
        id={videoId}
        
        source='youtube'
      />
      <Segment>
        <SearchResources />
      </Segment>

        
    </Segment.Group>

  );
}

export default ResourceDisplay;