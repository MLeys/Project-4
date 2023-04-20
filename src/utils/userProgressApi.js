import tokenService from './tokenService'; 

const BASE_URL = '/api/user-progress';


export async function getAccumulatedProgress() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(BASE_URL + 'accumulated-progress', options);

  if (!response.ok) {
    throw new Error('Error fetching accumulated progress data');
  }

  return await response.json();
}

export async function getUserProgress(userId) {
  return fetch(`${BASE_URL}/${userId}`, {
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Error fetching user progress data');
  });
}

export async function assignSkill(userId, skillId) {
  return fetch(`/assign-skill/${userId}/${skillId}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Error assigning skill');
  });
}

export async function updateResourceCompletion(userId, subSkillId, resourceId, complete) {
  return fetch(`/update-resource-completion/${userId}/${subSkillId}/${resourceId}`, {
    method: 'PATCH',
    body: JSON.stringify({ complete }),
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Error updating resource completion');
  });
}
