import React, { Fragment } from "react";
import { DATA } from "../MOCK_DATA.js";
import QuestionCard from "../components/QuestionCard";
import { Box, Button, Skeleton, Text } from "@chakra-ui/react";
import QuestionComposer from "../components/QuestionComposer";
import SidebarTemplate from "../components/templates/Sidebar.Template";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

import { getPosts } from "../lib/dhive";
import QuestionCardSkeleton from "../components/QuestionCardSkeleton";

export default function Index() {
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

  const { isLoading, error, data, isFetching } = useQuery("questions", () =>
    getPosts()
  );

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

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
          bg="orange.500"
          color="white"
        >
          Ask Question
        </Button>
      </Box>
      {isLoading ? (
        <>
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
        </>
      ) : data ? (
        data.map((post, idx) => <QuestionCard key={idx} {...post} />)
      ) : null}
      
    </Fragment>
  );
};
