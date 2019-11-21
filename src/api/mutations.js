export const mutations = {
  INSERT_USER: `mutation ($user_name: String!){
      insert_user(objects: {user_name: $user_name, description: "", avatar_url: ""}) {
        returning {
          user_name
        }
      }
    }`,
  LIKE_POST: `mutation ($postId: uuid!, $userId: uuid!) {
      insert_like(objects: {post_id: $postId, user_id: $userId}) {
        affected_rows
      }
    }`,
  UNLIKE_POST: `mutation($postId: uuid!, $userId: uuid!) {
      delete_like(where: {_and: {post_id: {_eq: $postId}, user_id: {_eq: $userId}}}) {
        affected_rows
      }
    }
    `
};
