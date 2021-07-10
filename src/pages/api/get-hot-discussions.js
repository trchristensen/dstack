import axios from "axios";

const get_hot_discussions = async (req, res) => {
    // "", 100
    // or "example", 10
  const params = {
    tag: "dstack",
    start_author: "",
    start_permlink: "",
    limit: 100,
  };

  await axios
    .post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "condenser_api.get_discussions_by_hot",
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

export default get_hot_discussions;
