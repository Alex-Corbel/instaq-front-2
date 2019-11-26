export const action_types = {
  RETRIEVE_TIMELINE: "retrieveTimeline",
  UPDATE_TIMELINE_OFFSET: "updateTimelineOffset",
  RETRIEVE_PROFILE: "retrieveProfile",
  UPDATE_TOKEN: "updateToken",
  UPDATE_USER_ID: "updateUserId",
  INSERT_USER: "insertUser",
  RETRIEVE_PROFILE_FROM_NAME: "retrieveProfileFromName",
  UPDATE_CURRENT_PROFILE_PAGE_INDEX: "updateCurrentProfilePageIndex",
  UPDATE_POST_LIKE: "updatePostLike",
  SUBSCRIBE_TO_USER: "subscribeToUser",
  UNSUBSCRIBE_TO_USER: "unsubscribeToUser",
  SUBMIT_COMMENT: "submitComment",
  RETRIEVE_POST_DETAIL: "retrievePostDetail",
  SEARCH_USERS: "searchUsers",
  SEARCH_POSTS: "searchPosts"
};

export const mutation_types = {
  MUTATE_PROFILE: "setProfile",
  MUTATE_TIMELINE: "setTimeline",
  MUTATE_TIMELINE_OFFSET: "setTimeLineOffset",
  MUTATE_TOKEN: "setToken",
  MUTATE_USERID: "setUserId",
  MUTATE_PROFILE_FROM_NAME: "setProfileFromName",
  MUTATE_CURRENT_PROFILE_PAGE_INDEX: "setCurrentProfilePageIndex",
  MUTATE_POST_LIKE: "setPostLike",
  MUTATE_USER_SUBSCRIPTION: "setUserSubscription",
  MUTATE_POST_LIKE_COUNT: "setPostLikeCount",
  MUTATE_POST_ADD_COMMENT: "setPostAddComments",
  MUTATE_SETTINGS: "setSettings",
  MUTATE_POST_UPDATE_DETAILS: "setPostDetails",
  MUTATE_USERSSEARCH: "setUsersSearches",
  MUTATE_POSTSSEARCH: "setPostsSearches"
};
