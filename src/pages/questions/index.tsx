import React, { Fragment } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard";
import { Box, Button, Skeleton, Text } from "@chakra-ui/react";
import QuestionComposer from "../../components/QuestionComposer";
import SidebarTemplate from "../../components/templates/Sidebar.Template";
import { useRouter } from "next/router";
import { isError, useInfiniteQuery, useQuery } from "react-query";
import QuestionCardSkeleton, {
  HalfQuestionCardSkeleton,
} from "../../components/QuestionCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBar from "../../components/FilterBar";
import TwoColumnTemplate from "../../components/templates/TwoColumn.Template";

export default function QuestionsPage() {
  return (
    <React.Fragment>
      <TwoColumnTemplate
        main={<Main />}
        // leftSide={null}
        // rightSide={null}
      ></TwoColumnTemplate>
    </React.Fragment>
  );
}

const Main = () => {
  const router = useRouter();

  const [filter, setFilter] = React.useState("created");

  React.useEffect(() => {
    console.log("refetch called");
    refetch();
  }, [filter]);

  const handleFilterClick = (e) => {
    setFilter(e.target.value);
  };

  const fetchPosts = ({ pageParam = null }) =>
    axios("/api/get-ranked-posts?", {
      params: {
        cursor: pageParam,
        sort: filter,
        tag: "dstack",
        observer: "ipeeyay",
        // truncate_body: 100
      },
    });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("posts", fetchPosts, {
    // getNextPageParam: (lastPage, pages) => lastPage;
  });

  return (
    <Fragment>
      <Box
        d="flex"
        pb={4}
        justifyContent="space-between"
        alignItems="center"
        flexDirection={["column", "row", "row"]}
      >
        <Box order={[2, 1, 1]}>
          <FilterBar handleClick={handleFilterClick} />
        </Box>

        <Button
          order={[1, 2, 2]}
          onClick={() => router.push("/questions/ask")}
          bg="blue.500"
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
            dataLength={data ? data.pages.length : 1}
            next={() =>
              fetchNextPage({
                // pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
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
