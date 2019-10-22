const API_URL = "http://localhost:3000";

const fetchApi = async (method, urlParam) => {
  const response = await fetch(`${API_URL}/${urlParam}`, {
    method: method,
    headers: {
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }
  });
  if (!response) {
    throw response;
  }
  try {
    return await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error parsing JSON, returned nothing", err);
    return;
  }
};

export const fetchNewsFeed = async () => {
  return await fetchApi("GET", "newsfeed");
}

export const fetchUserProfile = async (userName) => {
  return await fetchApi("GET", `profile/${userName}`);
}