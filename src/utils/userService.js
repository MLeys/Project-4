import tokenService from './tokenService';

const BASE_URL = '/api/users/';

async function signup(user) {
  console.log(user, '<-- user in signup api call')
  
  return await fetch(BASE_URL + 'signup', {
    method: 'POST',
    // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    body: user // need stringify since not a file?
  })
  .then(res => {
    if (res.ok) return res.json()
  
    return res.json().then(response => {
      console.log(response.error); 
      throw new Error(response.error);
    })
  })
  .then(({token}) => tokenService.setToken(token)); 
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}
  }).then(res => {
    if(res.ok) return res.json() 
    throw new Error('Error from getProfile request, check the server terminal')
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};