import tokenService from "./tokenService";

const BASE_URL= '/api/'

export async function assignUser(data) {
  const subId = data.subSkill._id;
  console.log(data, 'what the fuck is wrong')
  try {
    const response = await fetch(`${BASE_URL}subskills/${subId}/assign`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error('Error assigning user to subskill, check server terminal');

  } catch (err) {
    console.log(`*** Error Assigning user to subskill *** \n${err}`);
    throw err;
  }
}



export async function unAssignUser(data) {
  const subId = data.subId;
  try {
		const response = await fetch(`${BASE_URL}subskills/${subId}/unassign`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				Authorization: "Bearer " + tokenService.getToken(),
				'Content-Type': 'application/json', 
			}
		});

    if (response.ok) {
      return response.json();
    }

    throw new Error('Error assigning user to subskill, check server terminal');

  } catch (err) {
    console.log(`*** Error Assigning user to subskill *** \n${err}`);
    throw err;
  }
}



export function create(skill){
    console.log(skill, "<--- create subskillAPI param")
	

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
	console.log(`\n\nSubskillAPI Params passed: ${subskill}\n\n`)
    // console.log(subskill.subId, "<--- UPDATE subskill API")

	return fetch(`${BASE_URL}subskills/${subskill.subId}/update`, {
        method: 'PUT',
		body: JSON.stringify(subskill),
		// body: subskill,
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