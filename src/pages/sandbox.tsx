import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from 'react-query';
import { getRankedPosts } from '../lib/api';
import QuestionCard from "../components/QuestionCard";
import axios from 'axios';

export default function SandBox() {
  const opts = {
    sort: "trending",
    tag: "food",
    observer: "ipeeyay",
    // start_author: "ipeeyay",
    // start_permlink: "7l6bkz2927o",
  };

  // const { isLoading, error, data, isFetching } = useQuery(
  //   "questions",
  //   () => getRankedPosts(opts)
  // );

  const { isLoading, error, data, isFetching } = useQuery("questions", () => axios.get('/api/get-ranked-posts', {
    params: {
      sort: "created",
      tag: "dstack",
      observer: "ipeeyay"
    }
  }));


  

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  let posts = data;

  return (
    <Box>
      {posts.map((post) => (
        // <QuestionCard {...post} />
        <Box>{JSON.stringify(post)}</Box>
      ))}
      <Button onClick={() => handleMorePosts()}>More Posts</Button>
    </Box>
  );
}





// const tagOptions = [
//     { value: "chocolate", label: "Chocolate" },
//     { value: "strawberry", label: "Strawberry" },
//     { value: "vanilla", label: "Vanilla" },
//   ];

  // const tagOptions = async () => {
  //   const tags = await getTrendingTags();
  //   setData(tags);
  // }

  // tagOptions();
