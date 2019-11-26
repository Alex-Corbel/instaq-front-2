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
    timeline: [],
    usersSearches: [],
    postsSearches: {},
    timelineOffset: 0,
    currentProfilePageIndex: 1,
    profileFromName: {
      id: "",
      user_name: "",
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
      },
      isFollower: {
        aggregate: {
          count: 0
        }
      }
    },
    profile: {
      id: "",
      user_name: "",
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
    profile: state => state.profile,
    getUsersSearches: state => state.usersSearches,
    getPostsSearches: state => state.postsSearches
  },
  mutations: {
    [mutation_types.MUTATE_TOKEN](state, token) {
      state.token = token;
    },
    [mutation_types.MUTATE_USERID](state, userId) {
      state.userId = userId;
    },
    [mutation_types.MUTATE_TIMELINE](state, timeline) {
      state.timeline = { ...state.timeline, ...timeline };
    },
    [mutation_types.MUTATE_TIMELINE_OFFSET](state, offset) {
      state.timelineOffset = offset;
    },
    [mutation_types.MUTATE_POST_LIKE](state, { postId, likeState }) {
      const timeline = state.timeline;
      timeline[postId].likes = likeState
        ? []
        : [{ post_id: postId, user_id: state.userId }];
      state.timeline = timeline;
    },
    [mutation_types.MUTATE_PROFILE](state, profile) {
      state.profile = { ...state.profile, ...profile };
    },
    [mutation_types.MUTATE_POST_LIKE_COUNT](state, { postId, count }) {
      const timeline = state.timeline;
      timeline[postId].likes_aggregate.aggregate.count = count;
      state.timeline = timeline;
    },
    [mutation_types.MUTATE_PROFILE_FROM_NAME](state, profileFromName) {
      state.profileFromName = { ...state.profileFromName, ...profileFromName };
    },
    [mutation_types.MUTATE_SETTINGS](state, tagname, avatar_url, description) {
      state.profile.user_name = tagname;
      state.profile.avatar_url = avatar_url;
      state.profile.description = description;
    },
    [mutation_types.MUTATE_CURRENT_PROFILE_PAGE_INDEX](
      state,
      currentProfilePageIndex
    ) {
      state.currentProfilePageIndex = currentProfilePageIndex;
    },
    [mutation_types.MUTATE_USER_SUBSCRIPTION](state, isSubscribe) {
      state.profileFromName.isFollower.aggregate.count = isSubscribe ? 1 : 0;
      state.profileFromName.followers_aggregate.aggregate.count += isSubscribe
        ? 1
        : -1;
    },
    [mutation_types.MUTATE_POST_ADD_COMMENT](state, { postId, comment }) {
      const timeline = state.timeline;
      state.timeline = {
        ...timeline,
        [postId]: {
          ...timeline[postId],
          comments: [...timeline[postId].comments, ...comment].sort(
            (c1, c2) => new Date(c1.created_at) >= new Date(c2.created_at)
          )
        }
      };
    },
    [mutation_types.MUTATE_POST_UPDATE_DETAILS](state, post) {
      const timeline = state.timeline;
      timeline[post.id] = post;
      state.timeline = timeline;
    },
    [mutation_types.MUTATE_USERSSEARCH](state, usersSearches) {
      state.usersSearches = [...usersSearches];
    },
    [mutation_types.MUTATE_POSTSSEARCH](state, postsSearches) {
      state.postsSearches = { ...postsSearches };
    }
  },
  actions: {
    async [action_types.RETRIEVE_TIMELINE](context) {
      const timeline = (
        await fetchAsync(context.state.token, fetcher, queries.timeline, {
          user_id: context.state.userId,
          offset: context.state.timelineOffset
        })
      ).data.post;
      const objectTimeline = timeline.reduce(
        (previous, current) => ({
          ...previous,
          [current.id]: current
        }),
        {}
      );
      context.commit(mutation_types.MUTATE_TIMELINE, objectTimeline);
      return timeline;
    },
    [action_types.UPDATE_TIMELINE_OFFSET](context, offset) {
      context.commit(mutation_types.MUTATE_TIMELINE_OFFSET, offset);
    },
    async [action_types.UPDATE_POST_LIKE](
      context,
      { likeState, postId, userId }
    ) {
      context.commit(mutation_types.MUTATE_POST_LIKE, {
        postId,
        likeState
      });
      const currentCount =
        context.state.timeline[postId].likes_aggregate.aggregate.count;
      context.commit(mutation_types.MUTATE_POST_LIKE_COUNT, {
        postId,
        count: likeState ? currentCount - 1 : currentCount + 1
      });
      await fetchAsync(
        context.state.token,
        fetcher,
        likeState ? mutations.UNLIKE_POST : mutations.LIKE_POST,
        { postId, userId }
      );
    },
    async [action_types.RETRIEVE_PROFILE](context) {
      const profile = await fetchAsync(
        context.state.token,
        fetcher,
        queries.profile,
        { id: context.state.userId }
      );
      const user = profile.data.user[0];
      context.commit(mutation_types.MUTATE_PROFILE, user);
    },
    async [action_types.INSERT_USER](context, user_name) {
      const user = await fetchAsync(
        context.state.token,
        fetcher,
        mutations.INSERT_USER,
        { user_name: user_name }
      );
      context.commit(
        mutation_types.MUTATE_PROFILE,
        user.data.insert_user.returning[0]
      );
    },

    async [action_types.SUBSCRIBE_TO_USER](context) {
      await fetchAsync(context.state.token, fetcher, mutations.SUBSCRIBE, {
        followee_id: context.state.profileFromName.id
      });
      context.commit(mutation_types.MUTATE_USER_SUBSCRIPTION, true);
    },
    async [action_types.UNSUBSCRIBE_TO_USER](context) {
      await fetchAsync(context.state.token, fetcher, mutations.UNSUBSCRIBE, {
        followee_id: context.state.profileFromName.id
      });
      context.commit(mutation_types.MUTATE_USER_SUBSCRIPTION, false);
    },
    async [action_types.SEARCH_USERS](context, user_name) {
      const searchString = `%${user_name}%`;
      const usersSearches = (
        await fetchAsync(context.state.token, fetcher, queries.search_users, {
          user_name: searchString
        })
      ).data.user;
      context.commit(mutation_types.MUTATE_USERSSEARCH, usersSearches);
    },
    async [action_types.SEARCH_POSTS](context, hashtag) {
      const searchString = `%${hashtag}%`;
      const postsSearches = (
        await fetchAsync(context.state.token, fetcher, queries.search_posts, {
          hashtag: searchString
        })
      ).data.post;

      const objectSearches = postsSearches.reduce(
        (previous, current) => ({
          ...previous,
          [current.id]: current
        }),
        {}
      );
      context.commit(mutation_types.MUTATE_POSTSSEARCH, objectSearches);
      return postsSearches;
    },
    [action_types.UPDATE_TOKEN]: (context, token) => {
      context.commit(mutation_types.MUTATE_TOKEN, token);
    },
    [action_types.UPDATE_USER_ID]: (context, user_id) => {
      context.commit(mutation_types.MUTATE_USERID, user_id);
    },
    [action_types.RETRIEVE_PROFILE_FROM_NAME]: async (context, user_name) => {
      const profile = await fetchAsync(
        context.state.token,
        fetcher,
        queries.profileFromName,
        {
          user_name: user_name,
          follower_id: Vue.prototype.$keycloak.tokenParsed.sub
        }
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
    },
    [action_types.SUBMIT_COMMENT]: async (context, { postId, content }) => {
      const comment = await fetchAsync(
        context.state.token,
        fetcher,
        mutations.SUBMIT_COMMENT,
        {
          postId,
          content
        }
      );
      context.commit(
        mutation_types.MUTATE_POST_ADD_COMMENT,
        { comment: comment.data.insert_comment.returning, postId } || undefined
      );
    },
    [action_types.RETRIEVE_POST_DETAIL]: async (context, postId) => {
      const post = await fetchAsync(
        context.state.token,
        fetcher,
        queries.postDetails,
        {
          postId
        }
      );
      context.commit(
        mutation_types.MUTATE_POST_UPDATE_DETAILS,
        post.data.post[0]
      );
      return true;
    }
  },
  modules: {}
});
