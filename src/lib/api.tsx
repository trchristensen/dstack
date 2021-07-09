import axios from "axios";

export const getRankedPosts = async (args) => {
  try {
    const posts = await axios.post("https://api.hive.blog", {
      jsonrpc: "2.0",
      method: "bridge.get_ranked_posts",
      params: {
        sort: args.sort,
        tag: args.tag,
        observer: args.observer,
        start_author: args.start_author,
        start_permlink: args.start_permlink,
      },
      id: 1,
    });
    console.log(posts.data.result);
    let response = posts.data.result.map(
      ({
        active_votes,
        author,
        author_payout_value,
        author_reputation,
        beneficiaries,
        blacklists,
        body,
        category,
        children,
        created,
        curator_payout_value,
        depth,
        is_paidout,
        json_metadata,
        max_accepted_payout,
        net_rshares,
        payout,
        payout_at,
        pending_payout_value,
        percent_hbd,
        permlink,
        post_id,
        promoted,
        replies,
        stats,
        title,
        updated,
        url,
      }) => ({
        active_votes,
        author,
        author_payout_value,
        author_reputation,
        beneficiaries,
        blacklists,
        body,
        category,
        children,
        created,
        curator_payout_value,
        depth,
        is_paidout,
        json_metadata,
        max_accepted_payout,
        net_rshares,
        payout,
        payout_at,
        pending_payout_value,
        percent_hbd,
        permlink,
        post_id,
        promoted,
        replies,
        stats,
        title,
        updated,
        url,
      })
    );
    return response;
  } catch (error) {
    throw error;
  }
};


