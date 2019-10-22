const fetchApi = async (method, url) => {
  const response = await fetch(`${url}`, {
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
    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log(data);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error parsing JSON, returned nothing", err);
    return;
  }
};

export const fetchNewsFeed = async () => {
  return await fetchApi("GET", "http://localhost:3000/newsfeed");
}