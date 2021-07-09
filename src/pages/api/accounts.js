import axios from "axios";

export default async (req, res) => {
  const params = {
    sort: req.query.sort,
    tag: req.query.tag,
    observer: req.query.observer,
    start_author: req.query.start_author,
    start_permlink: req.query.start_permlink,
  };

  await axios
    .post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "bridge.get_ranked_posts",
      params: params,
      id: 1,
    })
    .then(({ data }) => {
      res.status(200).json({ data });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
};
