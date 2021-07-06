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

export const findComments = async (author, permlink) => {
  console.log("parameters", author, permlink);

  const data = client.database
    .call("get_content_replies", [author, permlink])
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
};



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
    tag: "philippines",
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

interface IPostData {
    taglist : string[]
    account_name: string,
    title: string,
    body: string,
    parent_permlink: "dstack",
    parent_author: "",
    json_metadata: "",
}

  export const sendPostRequest = (PostData) => {
    const keychain = window.hive_keychain;
    console.log('inside post request fn')

    const {account_name, title, body, json_metadata, parent_author} = PostData;

    // const taglist = ["tag", "another-tag"];
    // const account_name = "ipeeyay";
    // const title = "title";
    // const body = "body";
    const parent_permlink = "dstack";
    // const parent_author = "";
    // const json_metadata = JSON.stringify({
    //   tags: taglist,
    //   app: "dstack/0.1",
    // });
    const permlink = Math.random().toString(36).substring(2);
    const comment_options = "";

    keychain.requestPost(
      account_name,
      title,
      body,
      parent_permlink,
      parent_author,
      json_metadata,
      permlink,
      comment_options,
      function (response) {
        console.log(response);
      }
    );
  };