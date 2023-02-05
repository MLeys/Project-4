import tokenService from "./tokenService";

const BASE_URL= '/api/'

export function create(skill){
    console.log(skill, "<--- create subskillAPI param")
	console.log(skill.parentSkill)

	return fetch(`${BASE_URL}skills/${skill.parentSkill.name}/subskills`, {
        method: 'POST',
		body: JSON.stringify(skill),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
	}).then(res => {
		// This gets called when we get a response from the 
		// express server create like controller function
		if(res.ok) return res.json()
		throw new Error('Error creating a subSkill, check server terminal')
	})
}

export function getAllSubSkills(skillName) {
	return fetch(`${BASE_URL}/skills/${skillName}/subskill/all`, {
		headers: {
				Authorization: "Bearer " + tokenService.getToken() 
				//this is how we grab the token from local storage
		}
	}).then(res => {
		if(res.ok) return res.json() // decoding the json from the server response
		// so that we can interact with it like a regular javascript object
		throw new Error('Error from getSkill request, check the server terminal')
	})
}

export function update(subskill){
    console.log(subskill, "<--- UPDATE subskill param")
	

	return fetch(`${BASE_URL}skills/${subskill.parentSkill}/subskills/update`, {
        method: 'PUT',
		body: JSON.stringify(subskill),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
	}).then(res => {
		// This gets called when we get a response from the 
		// express server create like controller function
		if(res.ok) return res.json()
		throw new Error('Error creating a subSkill, check server terminal')
	})
}