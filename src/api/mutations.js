export const mutations = {
  INSERT_USER: `mutation ($user_name: String!){
      insert_user(objects: {user_name: $user_name, description: "", avatar_url: ""}) {
        returning {
          user_name
        }
      }
    }`,
  LIKE_POST: `mutation ($postId: uuid!) {
      insert_like(objects: {post_id: $postId}) {
        affected_rows
      }
    }`,
  UNLIKE_POST: `mutation($postId: uuid!) {
      delete_like(where: {_and: {post_id: {_eq: $postId}}}) {
        affected_rows
      }
    }`,
  UPLOAD_IMAGE: `mutation ($userId: String!, $image: String!) {
    uploadImage(image: $image userId: $userId) {
      created_at
      url
      url_thumbnail
    }
  }`,
  INSERT_POST: `mutation ($content: String!, $photo_url: String!, $thumbnail_url: String!) {
    insert_post(objects: {content: $content, photo_url: $photo_url, thumbnail_url: $thumbnail_url}) {
      returning {
        id
      }
    }
  }`,
  SUBSCRIBE: `mutation ($followee_id: uuid!) {
      insert_follow(objects: {followee_id: $followee_id}) {
        affected_rows
      }
    }`,
  UNSUBSCRIBE: `mutation ($followee_id: uuid!) {
      delete_follow(where: {followee_id: {_eq: $followee_id}}) {
        affected_rows
      }
  }`
};
