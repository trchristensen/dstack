import axios from "axios";

export default async (req, res) => {

  const params = {
      sort: req.query.sort ? req.query.sort : "newest",
      q: req.query.q,
      scroll_id: req.query.scroll_id ? req.query.scroll_id : null
  };

  await axios
    .post(
      `https://api.hivesearcher.com/search?sort=${params.sort}&q=${params.q}`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.HIVESEARCH_API,
        },
      }
    )
    .then(({ data }) => {
        let result_count;

        let posts_only = data.results.filter((item) => item.title)
        console.log(posts_only.length)

      res.status(200).json({ data: posts_only, real_result_count: data.results.length, scroll_id: data.scroll_id });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
};