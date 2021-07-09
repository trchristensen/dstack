import axios from "axios";

const get_ranked_posts = async (req, res) => {

  // 1st query. no start author, permlink. no cursor.
  
  // server sends back cursor

  // 2nd query. cursor converted into start params to request new content. cursor should update to new params (from last_author, last_permlink)



  let cursor = '';
  let start_a = '';
  let start_p = '';

  if (req.query.cursor) {
    cursor = req.query.cursor;
    start_a = cursor.split("__")[0];
    start_p = cursor.split("__")[1];
    console.log(cursor)
    console.log(start_a)
    console.log(start_p)
  } 

  const params = {
    sort: req.query.sort,
    tag: req.query.tag,
    observer: req.query.observer,
    start_author: start_a,
    start_permlink: start_p,
  };

  await axios
    .post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "bridge.get_ranked_posts",
      params: params,
      id: 1,
    })
    .then(({ data }) => {
      let last_author = data.result[data.result.length - 1].author;
      let last_permlink = data.result[data.result.length - 1].permlink;
      let _cursor = `${last_author}__${last_permlink}`;
      let cursoredObj = Object.assign({}, data, { cursor: _cursor });

      res.status(200).json({ data: cursoredObj });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
};

export default get_ranked_posts;