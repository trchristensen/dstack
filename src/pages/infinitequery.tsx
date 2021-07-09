import React from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Box, Button, Text, Container } from "@chakra-ui/react";
import QuestionCard from "../components/QuestionCard";
  import InfiniteScroll from "react-infinite-scroll-component";

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

  status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : null;



  return (
    <Container>
      <InfiniteScroll
        dataLength={data ? data.pages.length : 1}
        next={() =>
          fetchNextPage({
            pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
          })
        }
        // hasMore={data ? true : data?.pages[data.pages.length - 1].data.data.results.length > 20 ? false : true }
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.data.result.map((post) => (
                //   <p key={post.post_id}>{post.title}</p>
                <QuestionCard {...post} />
              ))}
            </React.Fragment>
          ))}
      </InfiniteScroll>
      <Box d="flex" justifyContent="center" mt={8}>
        {/* <Button
          onClick={() =>
            fetchNextPage({
              pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
            })
          }
        >
          Custom Fetch
        </Button> */}
      </Box>

      {/* <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
    </Container>
  );
}
