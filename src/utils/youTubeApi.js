import * as dotenv from 'dotenv'

import tokenService from './tokenService'

const API_KEY = 'AIzaSyAWWv9fl6un_cNgTplFYQnBlCZ_MNMJUzg'




export async function searchYouTube(search, skill, subSkill) {
    try {
    // const searchTerms = `${search}%20tutorial|guide`
    console.log(`Search Terms: ${search}`)
    const preSearch = search.replaceAll(' ', '%20')
    console.log(`New Search Terms: ${preSearch}`)
    const allTerms = (`${skill} ${subSkill} ${preSearch}`)
    const finalSearch = allTerms.replaceAll(' ', '%20')
    const searchTerms = `${finalSearch}`
    const part = 'snippet'
    const type = 'video'
    const videoEmbeddable = true
    const max = '4'
    const BASE_URL = 
        `https://youtube.googleapis.com/youtube/v3/search?part=${part}&type=${type}&maxResults=${max}&q=${searchTerms}&videoEmbeddable=${videoEmbeddable}&key=${API_KEY}`


    const response = await fetch(`${BASE_URL}`)
    const data = await response.json();
    const videos = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        publishTime: item.snippet.publishTime
    }));
    return videos

    } catch(err) {
        console.log(err)
        res.status(500).send('Error getting YouTube videos');
        throw new Error('Error grabbing Youtube Search, check server terminal')
    }

}


    // .then(res => {
    //     if(res.ok) {
    //         console.log(res.json(), "JSON FILE youtubeapi")
    //         return res.json()
    //     } else {
    //         throw new Error('Error grabbing Youtube Search, check server terminal')
    //     }
        
        
    // })
    // .then(data => {
    //     const results = data.items.map(item => {
    //       return {
    //         videoId: item.id.videoId,
    //         title: item.snippet.title,
    //         description: item.snippet.description,
    //         thumbnail: item.snippet.thumbnails.default.url,
    //         publishTime: item.snippet.publishTime
    //       }
    //     })
    //     return results
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
  
//     .then(data => {
//         const videos = data.items.map(item => {
//             const video = {
//                 videoId: item.id.videoId,
//                 title: item.snippet.title,
//                 description: item.snippet.description,
//                 thumbnails: item.snippet.thumbnails.default.url,
//                 publishTime: item.snippet.publishTime
//             }
//             return video
//         })
//         console.log(`Videos Result(API): ${videos}`)
//         return videos
//     })
//     .catch(err => console.error(err))

// }


// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json


// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[YOUR_API_KEY] HTTP/1.1


//GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cid&chart=mostPopular&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[YOUR_API_KEY] HTTP/1.1

//Accept: application/json


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