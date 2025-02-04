import axios from 'axios';

const apiUrl = import.meta.env.VITE_HIGH_BRIDGE_APP_API_URL;

export async function loginRequest(data) {
  const { idInstance, apiTokenInstance } = data;

  const url = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;

  const response = await axios.get(
    `${url}/waInstance${idInstance}/getSettings/${apiTokenInstance}`
  );
  console.log(response);
  
  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return  response.data;
}

export function checkLoginStatus() {
  const wid = localStorage.getItem('wid');

  if (!wid) {
    return false;
  }

  return true;
}

export function saveWhatsAppId(wid) {
  localStorage.setItem('wid', JSON.stringify(wid));  
}

export function saveWhatsAppUserInfo(data) {
  const { idInstance, apiTokenInstance } = data;

  localStorage.setItem('idInstance', JSON.stringify(idInstance));
  localStorage.setItem('apiTokenInstance', JSON.stringify(apiTokenInstance));  
}
