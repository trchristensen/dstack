import React, {useState, useEffect, Fragment} from 'react';
import { Box, Button, Text } from "@chakra-ui/react";
import TwoColumnTemplate from "../../components/templates/TwoColumn.Template";
import { useRouter } from "next/router";
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import QuestionCardSkeleton, { HalfQuestionCardSkeleton } from '../../components/QuestionCardSkeleton';
import QuestionCard from '../../components/QuestionCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterBar from '../../components/FilterBar';



export async function getServerSideProps(context) {
  console.log("context", context);
  const tag = context.query.tag
  
  return { props: { tag } };
}



export default function QuestionPage() {

      const router = useRouter();
      const { tag } = router.query;

  return (
    <TwoColumnTemplate
      main={     
      <Main tag={tag} />
    }
    //   titleSection={<TitleSection {...post} header={<div></div>} />}
    />
  );
}

const Main = ({tag}) => {
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
        tag: 'dstack-' + tag,
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
        px={4}
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