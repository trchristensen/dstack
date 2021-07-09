import React from 'react';
import { useInfiniteQuery } from "react-query";
import axios from 'axios';
import { Button, Text } from '@chakra-ui/react'

export default function Projects() {
  const fetchProjects = ({ pageParam = null }) =>
    axios("/api/get-ranked-posts?", {
      params: {
        cursor: pageParam,
        sort: "trending",
        tag: "cooking",
        observer: "ipeeyay",
      },
    });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("projects", fetchProjects, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

    status === "loading" ? 
    (<p>Loading...</p>)
     : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : null;

console.log(data && data.pages);

  return (
    <>
      {data &&
        data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.data.result.map((post) => (
              <p key={post.post_id}>{post.title}</p>
            ))}
          </React.Fragment>
        ))}

      {JSON.stringify(data?.pages[data.pages.length - 1].data.data.cursor)}
      <div>
        {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button> */}
        <Button
          onClick={() =>
            fetchNextPage({
              pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
            })
          }
        >
          Custom Fetch
        </Button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
