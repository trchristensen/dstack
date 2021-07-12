import React, { Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";
import SidebarTemplate from "../components/templates/Sidebar.Template";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPosts } from "../lib/dhive";
import QuestionCardSkeleton from "../components/QuestionCardSkeleton";

export default function Index() {
   const router = useRouter();
   
  React.useEffect(() => {
    router.push("/questions");
  }, []);

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
      <Text>Redirecting...</Text>
    </Box>
  );
};
