import axios from "axios";

const get_ranked_posts = async (req, res) => {

  let posts = [];

  let cursor = "";
  let start_a = "";
  let start_p = "";

  if (req.query.cursor) {
    cursor = req.query.cursor;
    start_a = cursor.split("__")[0];
    start_p = cursor.split("__")[1];
  }

  let subTag = 'doge';
  if (req.query.tag) {
    subTag = req.query.tag
  }


  const params = [
    {
      tag: "crypto",
      start_author: "",
      start_permlink: "",
      limit: 100,
    },
  ];

  const requestPosts = async () => {
    await axios
      .post("https://api.hive.blog", {
        jsonrpc: "2.0",
        method: "condenser_api.get_discussions_by_created",
        params: params,
        id: 1,
      })
      .then(({ data }) => {
        // for cursor param (needed for infinite query)
        let last_author = data.result[data.result.length - 1].author;
        let last_permlink = data.result[data.result.length - 1].permlink;
        let _cursor = `${last_author}__${last_permlink}`;
        let cursoredObj = Object.assign({}, data, { cursor: _cursor });
        //

        const filtered = data.result.filter((post) => {
          return post.json_metadata.includes(subTag);
        });

        posts.push(filtered);

        return;

        // if less than results after filtered, make sure there were over 20 from data.
        // then need to query again and append the results to an array of objects declared outside of the function.
        
      })
      .catch(({ err }) => {
        res.status(400).json({ err });
      });

      res.status(200).json({ data: posts });
  }

  


    


};

export default get_ranked_posts;
