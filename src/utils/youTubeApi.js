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