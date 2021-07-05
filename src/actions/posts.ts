import { Client } from "@hiveio/dhive";
// import hive from '@hiveio/hive-js';


// dhive config
const client = new Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
]);

  let opts = {};

  //connect to production server
  opts.addressPrefix = "STM";
  opts.chainId =
    "beeab0de00000000000000000000000000000000000000000000000000000000";

// end dhive config


export const getPost = async (author, permlink) => {

    console.log('parameters', author, permlink)
    
    const data = client.database
      .call("get_content", [author, permlink])
      .then((result) => {
        console.log("Response received:", result);
        if (result) {
          return result;
        }
      })
      .catch((err) => {
        console.log(err);
        // alert(`Error:${err}, try again`);
        throw err;
      });

      return data;
}


// export const getPost = async (author:string, permlink:string) => {
//     hive.api.getContent(author, permlink, function (err, result) {
//       console.log(err, result);
//       if (err) throw err;
//       return result;
//     });
// }

export const getPosts = async () => {

  const query = {
    // tag: "dstack",
    tag: "hive",
    limit: 100,
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
