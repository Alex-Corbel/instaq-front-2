export const mutations = {
  insertUser: `mutation ($user_name: String!){
      insert_user(objects: {user_name: $user_name, description: "", avatar_url: ""}) {
        returning {
          user_name
        }
      }
    }`
};
