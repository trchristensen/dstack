import React, { Fragment } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard";
import { Box, Button, Skeleton, Text } from "@chakra-ui/react";
import QuestionComposer from "../../components/QuestionComposer";
import SidebarTemplate from "../../components/templates/Sidebar.Template";
import { useRouter } from "next/router";
import { isError, useInfiniteQuery, useQuery } from "react-query";
import QuestionCardSkeleton, { HalfQuestionCardSkeleton } from "../../components/QuestionCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export default function QuestionsPage() {
  return (
    <React.Fragment>
      <SidebarTemplate
        main={<Main />}
        // leftSide={null}
        // rightSide={null}
      ></SidebarTemplate>
    </React.Fragment>
  );
}

const Main = () => {
  const router = useRouter();

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

  return (
    <Fragment>
      <Box
        d="flex"
        pb={4}
        px={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text as="h2" fontSize="xl">
          Explore Our Questions
        </Text>
        <Button
          onClick={() => router.push("/questions/ask")}
          bg="red.700"
          color="white"
        >
          Ask Question
        </Button>
      </Box>

      {status === "loading" ? (
        <>
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
        </>
      ) : status === "error" ? (
        <Text>An error has occurred: {JSON.stringify(error)}</Text>
      ) : data ? (
        <Box>
          <InfiniteScroll
            // pullDownToRefresh
            dataLength={data ? data.pages.length : 1}
            next={() =>
              fetchNextPage({
                pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
              })
            }
            hasMore={
              data?.pages[data.pages.length - 1].data.data.result.length === 20
            }
            loader={<HalfQuestionCardSkeleton />}
            endMessage={
              <Box p={4} textAlign="center">
                <b>Yay! You have seen it all 😃</b>
              </Box>
            }
          >
            {data &&
              data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.data.result.map((post) => (
                    <QuestionCard {...post} />
                  ))}
                </React.Fragment>
              ))}
          </InfiniteScroll>
        </Box>
      ) : null}
    </Fragment>
  );
};
