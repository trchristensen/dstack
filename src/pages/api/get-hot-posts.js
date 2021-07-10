import axios from "axios";

const get_hot_discussions = async (req, res) => {
  const params = [{ tag: "dstack", limit: 20, truncate_body: 0 }];

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
