const fetchApi = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });
  if (!response.ok) {
    throw response;
  }
  return await response.json();
};
export const fetchUsersList = async url => {
  return fetchApi(url);
};