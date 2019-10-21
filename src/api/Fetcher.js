const BASE_URL = "";

export const fetchApi = async (method, url) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
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