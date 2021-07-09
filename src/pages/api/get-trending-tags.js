import axios from "axios";

const get_trending_tags = async (req, res) => {
    // "", 100
    // or "example", 10
  const params = ["", 100]

  await axios
    .post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "condenser_api.get_trending_tags",
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

export default get_trending_tags;
