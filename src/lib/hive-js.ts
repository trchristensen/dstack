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


export const getContent = (author, permlink) => {
    hive.api.getContent(author, permlink, function (err, result) {
      console.log(err, result);
    });

}