
import { useState, useEffect } from "react";
// import * as youTubeApi from "../src/utils/youTubeApi";
import * as youTubeApi from "../../utils/youTubeApi"

function Dashboard() {
    const [state, setState] = useState('')
    async function searchYouTube() {
        
        try {
          const response = await youTubeApi.searchYouTube();
          console.log(response, " <------ response from YOUTUBE SEARCH");
          // update the cards with likes array
          
        } catch (err) {
          console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
        }
      }
    
    function handleChange(e) {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        //Getting posts, C(R)UD
        
        
        
        
      }, []); // This is useEffect runs once when the Feed component
      // loads

    return ( 
        <>
            <h1> Dashboard page </h1>

        </>

        
    );
}

export default Dashboard;
