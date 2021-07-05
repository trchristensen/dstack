import React from "react";
import { useRouter } from "next/router";

// import { Client } from "@hiveio/dhive";

export default function SandBox() {
  const router = useRouter();

  const handleClick = () => {
    const keychain = window.hive_keychain;

    const taglist = ["tag", "another-tag"];
    const account_name = "ipeeyay";
    const title = "title";
    const body = "body";
    const parent_permlink = "dstack";
    const parent_author = "";
    const json_metadata = JSON.stringify({
      tags: taglist,
      app: "dstack/0.1",
    });
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

  const handleTip = () => {
      const username = "ipeeyay";
      const to = "trchristensen";
      const amount = 1;
      const memo = "tip from dstack!";
      const token = "HIVE";
      
      const keychain = window.hive_keychain;
      keychain.requestSendToken(username, to,amount,memo, token, function(response) {
    console.log(response);
});
  }


// const client = new Client([
//   "https://api.hive.blog",
//   "https://api.hivekings.com",
//   "https://anyx.io",
//   "https://api.openhive.network",
// ]);

  const getPosts = () => {
    let opts = {};

    //connect to production server
    opts.addressPrefix = "STM";
    opts.chainId =
      "beeab0de00000000000000000000000000000000000000000000000000000000";

    //connect to server which is connected to the network/production

    const query = {
      tag: "dstack",
      limit: 50,
    };

    // trending, hot, created, promoted
    const filter = "created";

    client.database
      .getDiscussions(filter, query)
      .then((result) => {
        console.log("Response received:", result);
        if (result) {
          var posts = [];
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Error:${err}, try again`);
      });
  };




  return (
    <>
      <button onClick={handleClick}>Post</button>
      <p></p>
      <button onClick={handleTip}>Tip</button>
      <p></p>
      {/* <button onClick={getPosts}>Get Posts</button> */}
    </>
  );
}
