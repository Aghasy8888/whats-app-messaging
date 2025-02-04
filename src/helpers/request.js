import axios from 'axios';

async function request(url, method = 'GET', body) {
  console.log(888888888888);
  
  const config = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    config.data = body; // In Axios, use 'data' for the request body
  }

  const response = await axios(config);

  return response.data;
}

export default request;
