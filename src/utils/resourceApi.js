
import tokenService from "./tokenService.js";

const BASE_URL = '/api/resources/';

export async function unAssignUserFromResource(data) {
	const resourceId = data.resource._id
	console.log('resource api before fetch')
	return await fetch(`${BASE_URL}${resourceId}`, {
		method: 'PUT',
		body: JSON.stringify(data.user),
		headers: {
			Authorization: "Bearer " + tokenService.getToken(),
			'Content-Type': 'application/json', 
		}
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error UNASSIGN RESOURCE API. check server terminal')
	})
}


export async function assignUserToResource(data) {
	console.log(`Assign- ResourceApi - DATA: ${data.user._id}`)
	const resourceId = data.resource._id
	return await fetch(`${BASE_URL}${resourceId}`, {
		method: 'POST',
		body: JSON.stringify(data.user),
		headers: {
			Authorization: "Bearer " + tokenService.getToken(),
			'Content-Type': 'application/json', 
		}
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error ASSIGN RESOURCE API. check server terminal')
	})
}



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

export  async function getAll() {
    return await fetch(`${BASE_URL}all`, {
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then(res => {
		if(res.ok) return res.json()
		throw new Error('Error from getALLResources request, check the server terminal')
	  })
}

export async function deleteResource(id){
	console.log(`ResourceApi-Delete: ${id}`)
	return fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}	
	}).then(res => {
		if(res.ok) return res.json() 
		throw new Error('Error deleting a resource check the server terminal')
	})
}

export async function deleteAllResourcesByVideoId(videoId) {
	console.log(`Video ID for delete all >> ${videoId}`)
	return fetch(`${BASE_URL}deleteAllByVideoId/${videoId}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}	
	}).then(res => {
		if(res.ok) return res.json() 
		throw new Error('Error deleting a resource check the server terminal')
	})
}