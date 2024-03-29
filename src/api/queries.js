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
  timeline: `query ($user_id: uuid!, $offset: Int!) {
    post(where: {user: {followers: {followers: {id: {_eq: $user_id}}}}}, limit: 10, offset: $offset, order_by: {created_at: desc}) {
      content
      created_at
      photo_url
      thumbnail_url
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
        id
        content
        created_at
        user {
          avatar_url
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
  `,
  postDetails: `query ($postId: uuid!) {
    post(where: {id: { _eq: $postId}}) {
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
      comments(order_by: {created_at: asc}) {
        id
        content
        created_at
        user {
          avatar_url
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
  `,
  search_users: ` query ($user_name: String!) {
    user(where: {user_name: {_ilike: $user_name}}) {
      id
      user_name
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
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  `,
  search_posts: `query ($hashtag: String!) {
    post(where: {content: {_ilike: $hashtag}}, order_by: {created_at: desc}) {
      content
      created_at
      photo_url
      thumbnail_url
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
        id
        content
        created_at
        user {
          avatar_url
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
  }`
};
