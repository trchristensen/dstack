import { Client } from "@hiveio/dhive";

const client = new Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
]);

export const getPosts = async () => {

  let opts = {};

  //connect to production server
  opts.addressPrefix = "STM";
  opts.chainId =
    "beeab0de00000000000000000000000000000000000000000000000000000000";

  //connect to server which is connected to the network/production

  const query = {
    // tag: "dstack",
    tag: "hive",
    limit: 50,
  };

  // trending, hot, created, promoted
  const filter = "created";

  const data = client.database
    .getDiscussions(filter, query)
    .then((result) => {
      console.log("Response received:", result);
      if (result) {
        return result;
      }
    })
    .catch((err) => {
      console.log(err);
      alert(`Error:${err}, try again`);
    });

  return data;
};
