import Vue from "vue";
import Vuex from "vuex";
import { queries } from "@/api/queries.js";
import { mutations } from "@/api/mutations.js";
import { mutation_types, action_types } from "./types";
import { fetchAsync, fetcher } from "@/api/fetcher.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userId: "",
    timeline: [
      // post list
    ],
    currentProfilePageIndex: 1,
    profileFromName: {
      user_name: "",
      user_id: "",
      firstname: "",
      lastname: "",
      description: "",
      avatar_url: "",
      followers_aggregate: {
        aggregate: {
          count: 0
        }
      },
      follows_aggregate: {
        aggregate: {
          count: 0
        }
      },
      posts: [],
      status: {
        status_name: "OK"
      },
      posts_aggregate: {
        aggregate: {
          count: 0
        }
      }
    },
    profile: {
      user_name: "",
      user_id: "",
      firstname: "",
      lastname: "",
      description: "",
      avatar_url: "",
      followers_aggregate: {
        aggregate: {
          count: 0
        }
      },
      follows_aggregate: {
        aggregate: {
          count: 0
        }
      },
      posts: [],
      status: {
        status_name: "OK"
      },
      posts_aggregate: {
        aggregate: {
          count: 0
        }
      }
    }
  },
  getters: {
    getToken: state => state.token,
    getUserId: state => state.user_id,
    getTimeLine: state => state.timeline,
    profile: state => state.profile
  },
  mutations: {
    [mutation_types.MUTATE_TOKEN](state, token) {
      state.token = token;
    },
    [mutation_types.MUTATE_USERID](state, userId) {
      state.userId = userId;
    },
    [mutation_types.MUTATE_TIMELINE](state, timeline) {
      state.timeline = { ...state.timeline, ...timeline }; // enougth for now
    },
    [mutation_types.MUTATE_PROFILE](state, profile) {
      state.profile = { ...state.profile, ...profile };
    },
    [mutation_types.MUTATE_PROFILE_FROM_NAME](state, profileFromName) {
      state.profileFromName = { ...state.profileFromName, ...profileFromName };
    },
    [mutation_types.MUTATE_CURRENT_PROFILE_PAGE_INDEX](
      state,
      currentProfilePageIndex
    ) {
      state.currentProfilePageIndex = currentProfilePageIndex;
    }
  },
  actions: {
    async [action_types.RETRIEVE_TIMELINE](context) {
      const timeline = await fetchAsync(
        context.state.token,
        fetcher,
        queries.timeline,
        { user_id: context.state.userId }
      );
      context.commit(mutation_types.MUTATE_TIMELINE, timeline);
    },
    async [action_types.RETRIEVE_PROFILE](context) {
      const profile = await fetchAsync(
        context.state.token,
        fetcher,
        queries.profile,
        { user_id: context.state.userId }
      );
      const user = profile.data.user[0];
      context.commit(mutation_types.MUTATE_PROFILE, user);
    },
    async [action_types.INSERT_USER](context, user_name) {
      const user = await fetchAsync(
        context.state.token,
        fetcher,
        mutations.insertUser,
        { user_name: user_name }
      );
      context.commit(mutation_types.MUTATE_PROFILE, user);
    },
    [action_types.UPDATE_TOKEN]: (context, token) => {
      context.commit(mutation_types.MUTATE_TOKEN, token);
    },
    [action_types.UPDATE_USER_ID]: (context, user_id) => {
      context.commit(mutation_types.MUTATE_USERID, user_id);
    },
    [action_types.RETRIEVE_PROFILE_FROM_NAME]: async (context, userName) => {
      const profile = await fetchAsync(
        context.state.token,
        fetcher,
        queries.profileFromName,
        { user_name: userName }
      );
      const user = profile.data.user[0];
      context.commit(mutation_types.MUTATE_PROFILE_FROM_NAME, user);
    },
    [action_types.UPDATE_CURRENT_PROFILE_PAGE_INDEX]: (
      context,
      currentProfilePageIndex
    ) => {
      context.commit(
        mutation_types.MUTATE_CURRENT_PROFILE_PAGE_INDEX,
        currentProfilePageIndex
      );
    }
  },
  modules: {}
});
