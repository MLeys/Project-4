import tokenService from "./tokenService";

const BASE_URL = '/api/skills/';


export function create(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            ContentType: 'application/json',
            body: JSON.stringify(creds)
        }
        
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('---- ERROR create skill -----');
      })
}
