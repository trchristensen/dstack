import axios from "axios";

export default async (req, res) => {
  
    const params = {
    account: req.query.account,
    limit: req.query.limit,
  };

  await axios
    .post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "bridge.account_notifications",
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
