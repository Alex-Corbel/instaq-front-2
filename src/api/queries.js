export const queries = {
  profile: `query ($id: uuid!) {
    user(where: {id: {_eq: $id}}) {
      id
      user_name
      description
      avatar_url
      followers_aggregate {
        aggregate {
          count(columns: follower_id)
        }
      }
      follows_aggregate {
        aggregate {
          count(columns: followee_id)
        }
      }
      posts(order_by: {created_at: desc}) {
        id
        photo_url
      }
      status {
        status_name
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }  
      `,
  profileFromName: `query ($user_name: String!, $follower_id: uuid!) {
    user(where: {user_name: {_ilike: $user_name}}) {
      id
      user_name
      description
      avatar_url
      followers_aggregate {
        aggregate {
          count(columns: follower_id)
        }
      }
      posts(order_by: {created_at: desc}) {
        id
        photo_url
      }
      status {
        status_name
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
      follows_aggregate {
        aggregate {
          count(columns: followee_id)
        }
      }
      isFollower: followers_aggregate(where: {follower_id: {_eq: $follower_id}}) {
        aggregate {
          count(columns: follower_id)
        }
      }
    }
  }`,
  timeline: `query ($user_id: String!) {
        post(where: {user: {_and: {user_id: {_eq: $user_id}, follows: {followers: {user_id: {_eq: $user_id}}}}}}) {
          content
          created_at
          photo_url
          id
          user_name
        }
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        user_id
        post_id
      }
    }
  }
  
  `
};
