import axios from 'axios';

async function request(url, method = 'GET', body) {
  
  const config = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    config.data = body;
  }

  const response = await axios(config);

  return response.data;
}

export default request;
