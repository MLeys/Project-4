
import tokenService from "./tokenService";

const BASE_URL = '/api/skills/';

export async function createInitialSkillsFromList(skillsList) {
	console.log(skillsList, ' list data in api')
	const response = await fetch(`${BASE_URL}createInitial`, {
			method: 'POST',
			headers: {
					// Authorization: "Bearer " + tokenService.getToken(),
				 'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
			},
			body: JSON.stringify({ skillsList }),

	});

	if (!response.ok) {
		throw new Error('Error creating skills and subskills');
	}

	const createdSkills = await response.json();
	return createdSkills;
}


export async function create(data) {
	console.log(data, 'data in create skill api')
    return await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
           'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
        
	}).then((res) =>{
		if(res.ok) return res.json() // return if everything okay
		return res.json().then(res => {
			throw new Error('Something went wrong in create Post'); // < this goes to the catch block
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

export async function unAssignUser(user, skillId) {
	// console.log(skillId, "<- skill")
	// console.log(user, "<- user")
	return await fetch(`${BASE_URL}${skillId}`, {
		method: 'PUT',
		body: JSON.stringify(user),
		headers: {
			Authorization: "Bearer " + tokenService.getToken(),
			'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
		}
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error in UNASSIGN SKILL API. Check Terminal')
	})
}