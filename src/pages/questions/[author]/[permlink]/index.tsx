import React from "react";
import { Avatar, Box, Stack, HStack, Text, Button, Tag } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { findComments, getPost } from "../../../../lib/dhive";
import Image from "next/image";
import { AuthContext } from "../../../../lib/AuthProvider";
import Link from "next/link";
import MarkDown from '../../../../components/MarkDown'
import HiveSlider from '../../../../components/HiveSlider.component'
import TwoColumnTemplate from "../../../../components/templates/TwoColumn.Template";

export async function getServerSideProps(context) {
  console.log("context", context);

  const post = await getPost(context.query.author, context.query.permlink);
  return { props: { post } };
}

export default function QuestionPage({ post }) {
  // const { data } = useQuery(
  //   "question",
  //   () => getPost(post.author, post.permlink),
  //   { initialData: post }
  // );

  return (
    <TwoColumnTemplate
      main={<Main {...post} />}
      // titleSection={<TitleSection {...post}
      // header={<div></div>} />
    // }
    />
  );
}

const Main = (props) => {
  const metadata = JSON.parse(props.json_metadata);
  const { user, setUser } = React.useContext(AuthContext);
  const [votePower, setVotePower] = React.useState(0);
  return (
    <React.Fragment>
      <Box d="flex" flexWrap="nowrap" flexDir="row">
        <Box mr={4} id="question__voteBox" pl={4}>
          <Stack justifyContent="center" alignItems="center" spacing={0}>
            <TriangleUpIcon h={"40px"} w={"40px"} />
            <Text fontSize="2xl" as="div">
              {props.net_votes}
            </Text>
            <TriangleDownIcon h={"40px"} w={"40px"} />
          </Stack>
        </Box>
        <Box
          rounded="md"
          shadow="md"
          id="question__details"
          w="auto"
          p={4}
          bg="white"
          // maxW="600px"
        >
          {/* <Box px={4}>
            <HiveSlider isValue={votePower} />
          </Box> */}

          {user && user === props.author && (
            <Box d="flex" flexDir="column" justifyContent="flex-end">
              <Box>
                {/* need to also check if it's past the payout time. if it is, can't edit anymore. */}
                <Text>Mark as answered</Text>
              </Box>
              <Box d="flex" justifyContent="flex-end">
                <Link
                  href={`/questions/${props.author}/${props.permlink}/edit`}
                >
                  <a>Edit</a>
                </Link>
              </Box>
            </Box>
          )}

          <Box>
            <Text as="h1" fontSize="xl" fontWeight="600" mb={4}>
              {props.title}
            </Text>
          </Box>

          <div id="markdown">
            <MarkDown children={props.body} />
          </div>
          <Box mt={4} spacing={1}>
            {metadata.tags && metadata.tags.map((tag) => <Tag>{tag}</Tag>)}
          </Box>
          <Box my={4} borderTopWidth={1}>
            <Answers {...props} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const TitleSection = (props) => (
  <Stack pb={4}>
    <Text as="h1" fontSize="x-large">
      {props.title}
    </Text>
    <Text>{props.last_update}</Text>
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
          <Box key={idx} p={4}>
            <Text>{answer.author}</Text>
            <MarkDown>{answer.body}</MarkDown>
          </Box>
        ))}
      {/* {JSON.stringify(data)} */}
    </Stack>
  );
};