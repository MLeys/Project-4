
import tokenService from "./tokenService.js";

const BASE_URL = '/api/resources/';


export async function create(data) {
	try {


		return fetch(BASE_URL, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				Authorization: "Bearer " + tokenService.getToken(),
			   'Content-Type': 'application/json', 
			}
			
		}).then((res) =>{
			if(res.ok) {
				
				return res.json() 
			}
			return res.json().then(res => {
				throw new Error('Something went wrong in create Post'); 
			})
		})
	} catch (err) {
		console.log(`Error handing create Resource`)
		throw new Error('Cannot create new Resource (resourceApi)')
	}

}

export function getAll() {
    return fetch(`${BASE_URL}all`, {
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error from getALLResources request, check the server terminal')
	  })
}

export function deleteResource(id){
	console.log(`ResourceApi-Delete: ${id}`)
	return fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}	
	}).then(res => {
		// res is the response from the server
		// This gets called when we get a response from the 
		// express server delete controller function
		if(res.ok) return res.json() 
		throw new Error('Error deleting a resource check the server terminal')
	})
}







// =========================================================================================================
// =========================================================================================================
// ========================== ALL OLD (from skillapi) NEED TO REFACTOR======================================
// =========================================================================================================
// =========================================================================================================



// export function getOneSkill(skillName) {
	
// 	return fetch(BASE_URL + skillName, {
// 		headers: {
// 				Authorization: "Bearer " + tokenService.getToken() 
// 				//this is how we grab the token from local storage
// 			}
// 	}).then(res => {
// 		if(res.ok) return res.json() // decoding the json from the server response
// 		// so that we can interact with it like a regular javascript object
// 		throw new Error('Error from getSkill request, check the server terminal')
// 	})
// }

// export function assignUser(user, skillId) {
// 	console.log(skillId, "<- skill")
// 	console.log(user, "<- user")
// 	return fetch(`${BASE_URL}${skillId}`, {
//         method: 'POST',
// 		body: JSON.stringify(user),
//         headers: {
//             Authorization: "Bearer " + tokenService.getToken(),
//             'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
//         }
// 	}).then(res => {
// 		if(res.ok) return res.json()
// 		throw new Error('Error creating a subSkill, check server terminal')
// 	})
// }

// export function unAssignUser(user, skillId) {
// 	console.log(skillId, "<- skill")
// 	console.log(user, "<- user")
// 	return fetch(`${BASE_URL}${skillId}`, {
//         method: 'PUT',
// 		body: JSON.stringify(user),
//         headers: {
//             Authorization: "Bearer " + tokenService.getToken(),
//             'Content-Type': 'application/json', // MUST HAVE OR req.body in Ctrl remains emppty!!!!
//         }
// 	}).then(res => {
// 		if(res.ok) return res.json()
// 		throw new Error('Error creating a subSkill, check server terminal')
// 	})
// }
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================