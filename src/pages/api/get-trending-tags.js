import axios from "axios";
import { compressArray } from '../../utils/compressArray'

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
      // console.log(data);
      let tags = []
      // map posts to get tag ararys.
      const getTags = data.result.map(post => {
      
        // map tag arrays to push to tags variable
      JSON.parse(post.json_metadata).tags.map(tag => {
          tags = [...tags, tag.replace(/dstack-/g, "")];
        })
      })

      const countedTags = compressArray(tags);
      // console.log(countedTags)

      const sorted = countedTags.sort((a, b) => b.count - a.count).slice(0, 30)
      

      res.status(200).json({ tags: sorted });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
};

export default get_hot_discussions;
