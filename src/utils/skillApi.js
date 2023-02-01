import tokenService from "./tokenService";

const BASE_URL = '/api/skills/';


export function create(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            // 'Content-Type': 'application/json',
        body: JSON.stringify(data)
        }
        
    }).then((res) =>{
		if(res.ok) return res.json() // return if everything okay

		// this is the return if there was an error from the server
		return res.json().then(res => {
			console.log(res, ' <- this is the response in Skill create function in your utils folder')
			throw new Error('Something went wrong in create Skill'); 
		})
	})
}

export function getAll() {
    console.log(" &&&&&&&&&&&&&&&&&&&&&&&&&&&&&& YES YOU ARE HITTING RIGHT HERE !!!! =========")
    return fetch(BASE_URL, {
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        }
    }.then(console.log())).then(res => res.json(), console.log(res, "<---RES", res.json(), " ==<<<<<RES.JSON"));
}