
import tokenService from "./tokenService";

const BASE_URL = '/api/skills/';

export async function createAllSkillsFromList(data) {
	return await fetch(`${BASE_URL}createInitial`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
					Authorization: "Bearer " + tokenService.getToken(),
				 'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
			}
}).then((res) =>{
	if(res.ok) return res.json() 

	return res.json().then(res => {
		throw new Error('Error creating all skills from list in skillsApi'); 
	})
})
}

export async function create(data) {
    console.log(data, 'THS IS DATA')
    console.log(JSON.stringify(data), " <<< <STRINGIFIED DATA")
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
           'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
        
	}).then((res) =>{
		if(res.ok) return res.json() // return if everything okay

		// this is the return if there was an error from the server
		return res.json().then(res => {
			console.log(res, ' <- this is the response in Posts create function in your utils folder')
			throw new Error('Something went wrong in create Post'); // < this goes to the catch block
			// when you call the create function (in handleAddPost in the feed page)
		})
	})
}

export async function getAll(userId) {
	const res = await fetch(`${BASE_URL}all/${userId}`, {
		headers: {
			Authorization: "Bearer " + tokenService.getToken(),
		}
	});
	if (res.ok)
		return res.json();
	throw new Error('Error from getALLSkill request, check the server terminal');
}

export async function deleteSkill(skillId){
	const res = await fetch(`${BASE_URL}/${skillId}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken()
			//this is how we grab the token from local storage
		}
	});
	// res is the response from the server
	// This gets called when we get a response from the 
	// express server delete controller function
	if (res.ok)
		return res.json();
	throw new Error('Error deleting a skill check the server terminal');
}


export async function assignUser(user, skillId) {
	try {
		// console.log(skillId, "<- skill")
		// console.log(user, "<- user")
		return fetch(`${BASE_URL}${skillId}`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				Authorization: "Bearer " + tokenService.getToken(),
				'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
			}
		}).then(res => {
			if(res.ok) return res.json()
			throw new Error('Error creating a subSkill, check server terminal')
		})
	} catch (err) {
		throw new Error(`*** Error Assigning Skill to user *** \n${err}`)
	}

}

export function unAssignUser(user, skillId) {
	// console.log(skillId, "<- skill")
	// console.log(user, "<- user")
	return fetch(`${BASE_URL}${skillId}`, {
        method: 'PUT',
		body: JSON.stringify(user),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error creating a subSkill, check server terminal')
	})
}