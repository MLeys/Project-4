import tokenService from "./tokenService";

const BASE_URL= '/api/'

export function create(skillId){
    console.log(skillId, "<--- create subskillAPI param")

	return fetch(`${BASE_URL}skills/${skillId.name}/subSkills`, {
        method: 'POST',
        
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            // 'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
        }
	}).then(res => {
		// This gets called when we get a response from the 
		// express server create like controller function
		if(res.ok) return res.json()
		throw new Error('Error creating a subSkill, check server terminal')
	})
}
