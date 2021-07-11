import React, { Fragment } from "react";
import TwoColumnTemplate from "../components/templates/TwoColumn.Template";
import { Box, Text, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from "react-query";
import QuestionCardSkeleton, {
  HalfQuestionCardSkeleton,
} from "../components/QuestionCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionCard from "../components/QuestionCard";
import axios from "axios";
import FilterBar from "../components/FilterBar";

export async function getServerSideProps(context) {
  console.log("context", context);
  const q = context.query.q;

  return { props: { q } };
}


const SearchPage = ({ q }) => {
  const router = useRouter();

  return <TwoColumnTemplate main={<Main searchQuery={q} router={router} />} />;
};

const Main = ({ router, searchQuery }) => {

    const [filter, setFilter] = React.useState("newest");
    
    React.useEffect(() => {
     console.log('refetch called') 
      refetch();
    }, [filter])

    const handleFilterClick = (e) => {
      setFilter(e.target.value);
    };

  const fetchPosts = ({ pageParam = null }) =>
    axios("/api/search?", {
      params: {
        scroll_id: pageParam,
        cursor: pageParam,
        sort: filter,
        q: searchQuery,
        since: "2021-01-01T00:00:00+0000",
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
      >
        <FilterBar handleClick={handleFilterClick} />
        <Button
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
            {console.log(data)}
          <InfiniteScroll
            dataLength={data ? data.pages.length : 1}
            next={() =>
              fetchNextPage({
                // pageParam: data?.pages[data.pages.length - 1].data.data.cursor,
                pageParam:
                  data?.pages[data.pages.length - 1].data.scroll_id,
              })
            }
            hasMore={
              data?.pages[data.pages.length - 1].data.data.length === 40
            }
            loader={<HalfQuestionCardSkeleton />}
            endMessage={
              <Box p={4} textAlign="center">
                <b>Yay! You have seen it all 😃</b>
              </Box>
            }
          >
            {console.log(data.pages[0].data.scroll_id)}
            {data &&
              data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.data.map((post) => (
                    <QuestionCard dataSource={"search"} {...post} />
                  ))}
                </React.Fragment>
              ))}
          </InfiniteScroll>
        </Box>
      ) : null}
    </Fragment>
  );
};

export default SearchPage;
