import React from "react";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { Box, Stack, Text } from "@chakra-ui/react";
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";

// import { DATA } from "../../../MOCK_DATA";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import SidebarTemplate from "../../../components/templates/Sidebar.Template";

import { useQuery } from "react-query";

import { findComments, getPost } from "../../../lib/dhive";

export async function getServerSideProps(context) {
  console.log("context", context);

  const post = await getPost(context.query.author, context.query.permlink);
  return { props: { post } };
}

export default function QuestionPage({ post }) {
  const { data } = useQuery(
    "question",
    () => getPost(post.author, post.permlink),
    { initialData: post }
  );

  return (
    <SidebarTemplate
      main={<Main {...post} />}
      titleSection={<TitleSection {...post} header={<div></div>} />}
    />
  );
}

const Main = (props) => {
  console.log("props", props);

  const metadata = JSON.parse(props.json_metadata);

  return (
    <React.Fragment>
      <Box pt={4} d="flex" flexWrap="nowrap" flexDir="row">
        <Box id="question__voteBox" pl={4}>
          <Stack justifyContent="center" alignItems="center" spacing={0}>
            <TriangleUpIcon h={"40px"} w={"40px"} />
            <Text fontSize="2xl" as="div">
              {props.net_votes}
            </Text>
            <TriangleDownIcon h={"40px"} w={"40px"} />
          </Stack>
        </Box>
        <Box id="question__details" w="auto" p={4}>
          {
            // metadata.format === "markdown" ? <MDEditor.Markdown source={props.body} /> : props.body
            props.body
          }
        </Box>
      </Box>
      <Answers {...props} />
    </React.Fragment>
  );
};

const TitleSection = (props) => (
  <Stack pb={4}>
    <Text as="h1" fontSize="x-large">
      {props.title}
    </Text>
    <Text>
      {formatDistanceToNowStrict(parseISO(`${props.last_update}`), {
        addSuffix: true,
      })}
    </Text>
  </Stack>
);

const Answers = (post) => {
  const { data, isLoading, error } = useQuery(
    "answers",
    () =>
      findComments(
        post.author,
        post.permlink
      ),
    { initialData: post }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Stack spacing={4}>
      {data.map((answer) => (
        <Box bg="gray.100" p={4}>
          <Text>{answer.author}</Text>
          <Text>{answer.body}</Text>
        </Box>
      ))}
      {/* {JSON.stringify(data[0])} */}
    </Stack>
  );
};
