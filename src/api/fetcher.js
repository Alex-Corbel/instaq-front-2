const API_URL = "https://hasura.k8s.d0do.fr/v1/graphql";

export const fetcher = (token, query, variables) => {
  console.log(token);
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
};

export const fetchAsync = async (token, fetcher, query, variables) => {
  const response = await fetcher(token, query, variables);
  if (!response.ok) {
    throw response;
  }
  try {
    return await response.json();
  } catch (err) {
    console.error("Error parsing JSON", err);
  }
};
