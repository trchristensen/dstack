import hive from "@hiveio/hive-js";

export const findAccounts = async (accounts) => {
const data = await hive.api
  .callAsync("condenser_api.get_accounts", [accounts]);
  console.log('data', data)
  return data;
};

export const getProfile = async () => {
  // bridge.get_profile
}

export const getDiscussion = async () => {
  // bridge.get_discussion
//   returns post and replies?
};


export const getContent = async (author, permlink) => {
    hive.api.getContent(author, permlink, function (err, result) {
      console.log(err, result);
    });
}

export const getTrendingTags = async () => {
  const data = await hive.api
  .callAsync("condenser_api.get_trending_tags", [null]);
  console.log(typeof data)
  console.log(data)
  return data;
}