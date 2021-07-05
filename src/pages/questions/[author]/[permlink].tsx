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

import { getPost } from '../../../actions/posts'


 export async function getServerSideProps(context) {


   console.log('context', context.query) 

   const post = await getPost(context.query.author, context.query.permlink);
   return { props: { post } };

 }
 

export default function QuestionPage({ post }) {
  
  

  const { data } = useQuery("question", () => getPost(post.author, post.permlink), { initialData: post });


  // const data = null;
  // const { isLoading, error, data, isFetching } = useQuery("question", () =>
  //   getPost("ipeeyay", "md1016a72vvez4iiii5pxh")
  // );

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  // const question = DATA[1];
  // fetch the question using the id.

  return <SidebarTemplate main={<Main {...post} />} titleSection={<TitleSection {...post} header={<div></div>} />} />;
}



const Main = (props) => {

  console.log('props', props)



    return (
      <React.Fragment>
        <Box pt={4} d="flex" flexWrap="nowrap" flexDir="row">
          <Box id="question__voteBox" p={4}>
            <Stack justifyContent="center" alignItems="center" spacing={0}>
              <TriangleUpIcon h={"40px"} w={"40px"} />
              <Text fontSize="2xl" as="div">
                {/* {props.voteCount} */}
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
      <Text>
        {formatDistanceToNowStrict(parseISO(`${props.last_update}`), {
          addSuffix: true,
        })}
      </Text>
    </Stack>
  );