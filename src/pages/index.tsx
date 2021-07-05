import React, { Fragment } from "react";
import { DATA } from "../MOCK_DATA.js";
import QuestionCard from "../components/QuestionCard";
import { Box, Button, Text } from "@chakra-ui/react";
import QuestionComposer from "../components/QuestionComposer";
import SidebarTemplate from '../components/templates/Sidebar.Template';
import { useRouter } from "next/router";

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

  return (
    <Fragment>
      <Box d="flex" pb={4} px={4} justifyContent="space-between" alignItems="center">
        <Text as="h2" fontSize="xl">Explore Our Questions</Text>
        <Button
          onClick={() => router.push("/questions/ask")}
          bg="orange.500"
          color="white"
        >
          Ask Question
        </Button>
      </Box>
      {DATA.map((item) => (
        <QuestionCard {...item} />
      ))}
    </Fragment>
  );
};
