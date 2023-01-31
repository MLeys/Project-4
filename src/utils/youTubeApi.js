import * as dotenv from 'dotenv'

import tokenService from './tokenService'

const API_KEY = 'AIzaSyAWWv9fl6un_cNgTplFYQnBlCZ_MNMJUzg'
// const API_KEY = process.env.GOOGLE_API_KEY

// const BASE_URL = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${API_KEY}&part=snippet,contentDetails,statistics,status`
// const BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cid&chart=mostPopular&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${API_KEY}`
// SECRET = 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
const part = 'snippet'
const max = '25'
const search = 'surfing'
const BASE_URL = 
    `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=${max}&q=${search}&key=${API_KEY}`


export function searchYouTube(keywords) {
    return fetch(`${BASE_URL}`, {
        headers: {
			Authorization: "Bearer " + tokenService.getToken(),
            Accept: application/json
            
			//this is how we grab the token from local storage
		}
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error('Error creating a like, check server terminal')
    })
}


// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json


// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[YOUR_API_KEY] HTTP/1.1


// //GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cid&chart=mostPopular&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[YOUR_API_KEY] HTTP/1.1

// //Accept: application/json





// GET https://youtube.googleapis.com/youtube/v3/search




// &q=surfing
// &key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json














// export function search(keyword) {
//     var q = $(keyword).val();
//     var request = gapi.client.youtube.search.list({
//       q: q,
//       part: 'snippet'
//     });
  
//     request.execute(function(response) {
//       var str = JSON.stringify(response.result);
//       $('#search-container').html('<pre>' + str + '</pre>');
//     });
//   }

//   export function execute(keywords) {
//     return gapi.client.youtube.search.list({
//       "part": [
//         "snippet"
//       ],
//       "maxResults": 25,
//       "q": keywords
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });