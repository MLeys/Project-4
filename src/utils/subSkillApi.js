import tokenService from "./tokenService";

const BASE_URL= '/api/'

export function create(skillId){
	return fetch(`${BASE_URL}skills/${skillId}/likes`, {
		method: 'POST',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}
	}).then(res => {
		// This gets called when we get a response from the 
		// express server create like controller function
		if(res.ok) return res.json()
		throw new Error('Error creating a like, check server terminal')
	})
}
