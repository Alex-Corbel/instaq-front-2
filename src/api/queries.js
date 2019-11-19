export const queries = {
  profile: `query ($user_id: String!) {
    user(where: {user_id: {_eq: $user_id}}) {
      user_name
      user_id
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
  profileFromName: `query ($user_name: String!) {
    user(where: {user_name: {_ilike: $user_name}}) {
      user_name
      user_id
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
  timeline: `query ($user_id: String!) {
        post(where: {user: {_and: {user_id: {_eq: $user_id}, follows: {followers: {user_id: {_eq: $user_id}}}}}}) {
          content
          created_at
          photo_url
          id
          status {
            status_name
          }
          user {
            avatar_url
            user_name
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
          comments(limit: 1, order_by: {created_at: desc}) {
            content
            created_at
            user {
              avatar_url
              id
              user_name
            }
          }
        }
      }`
};
