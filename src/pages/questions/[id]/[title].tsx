import React from "react";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { Box, Stack, Text } from "@chakra-ui/react";

import { DATA } from "../../../MOCK_DATA";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import SidebarTemplate from "../../../components/templates/Sidebar.Template";


export default function QuestionPage() {
  const router = useRouter();

  const question = DATA[1];
  // fetch the question using the id.

  return <SidebarTemplate main={<Main {...question} />} titleSection={<TitleSection {...question} header={<div></div>} />} />;
}



const Main = (props) => {


    return (
      <React.Fragment>
        <Box pt={4} d="flex" flexWrap="nowrap" flexDir="row">
          <Box id="question__voteBox" p={4}>
            <Stack justifyContent="center" alignItems="center" spacing={0}>
              <TriangleUpIcon h={"40px"} w={"40px"} />
              <Text fontSize="2xl" as="div">
                {props.voteCount}
              </Text>
              <TriangleDownIcon h={"40px"} w={"40px"} />
            </Stack>
          </Box>
          <Box id="question__details" w="auto">
            {props.body}
          </Box>
        </Box>
      </React.Fragment>
    );
  }

  const TitleSection = (props) => (
    <Stack pb={4}>
      <Text as="h1" fontSize="x-large">
        {props.title}
      </Text>
      <Text>Asked 2 years, 1 month ago</Text>
    </Stack>
  );