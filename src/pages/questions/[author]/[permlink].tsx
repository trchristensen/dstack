import React from "react";
import { Avatar, Box, Stack, HStack, Text } from "@chakra-ui/react";
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import SidebarTemplate from "../../../components/templates/Sidebar.Template";
import { useQuery } from "react-query";
import { findComments, getPost } from "../../../lib/dhive";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import Image from "next/image";



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
        <Box id="question__details" w="auto" p={4} maxW="600px">
          <ReactMarkdown children={props.body} />
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
    <HStack spacing={2} alignItems="center">
      <Avatar
        src={`https://images.hive.blog/u/${props.root_author}/avatar/small`}
      />
      <Text>{props.root_author}</Text>
    </HStack>
  </Stack>
);

const Answers = (post:any)  => {
  const { data, isLoading, error } = useQuery(
    "answers",
    () => findComments(post.author, post.permlink)
    // { initialData: post }
  );

  if (isLoading) return <Text>"Loading...";</Text>

  if (error) return <Text>An error has occurred: {JSON.stringify(error)}</Text>

  return (
    <Stack spacing={4}>
      {data &&
        data.map((answer, idx) => (
          <Box key={idx} bg="gray.100" p={4}>
            <Text>{answer.author}</Text>
            <ReactMarkdown>{answer.body}</ReactMarkdown>
          </Box>
        ))}
      {/* {JSON.stringify(data)} */}
    </Stack>
  );
};
