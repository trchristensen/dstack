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
  return (
    <Box p={4} textAlign="center" height="90vh">
      <Text>Nothing here.</Text>
    </Box>
  );
};
