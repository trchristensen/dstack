import React from "react";
import Navbar from "../Navbar";
// import Footer from "../Footer";
import { Container } from "../Container";
import {
  useColorMode,
  useColorModeValue,
  Flex,
  Box,
  Stack,
  Text,
  Icon,
  Tag,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "../DarkModeSwitch";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

export default function ({ main }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        {/* <Header /> */}
        <Box
          d="flex"
          flexDir="row"
          justifyContent="center"
          width="100%"
          maxW="1264px"
          id="main"
        >
          <Box
            id="content"
            d="flex"
            w="100%"
            maxW="1264px"
            flexDirection="row"
            alignItems="stretch"
            pt={6}
          >
            <Box w="100%">{main}</Box>
            <Box
              w="300px"
              //   bg="pink.100"
              flexShrink={0}
              display={["none", "none", "none", "block"]}
              pr={4}
            >
              <Stack spacing={4}>
                <Box minHeight="400px" rounded="md" bg="gray.100" py={4} px={4}>
                  <Text fontSize="lg" fontWeight="500">
                    Trending Tags
                  </Text>
                  <TrendingTags />
                </Box>
                <Box height="400px" rounded="md" bg="gray.100" py={4} px={4}>
                  <Text fontSize="lg" fontWeight="500">
                    Related Questions
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* <Footer /> */}
      <DarkModeSwitch />
    </React.Fragment>
  );
}

const Header = () => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };
  return (
    <Box
      w="100%"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      minHeight="70px"
    ></Box>
  );
};

const TrendingTags = () => {
  const { data, isLoading, isError, error } = useQuery("question", () =>
    axios("/api/get-trending-tags?", {
      params: {
        tag: "dstack",
        limit: 10,
      },
    })
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Cannot load Tags at this time.</span>;
  }

  return (
      <Box mt={4}>
        {/* {JSON.stringify(data.data.tags)} */}
        {data &&
          data.data.tags.map((tag) => {
            return <Tag mr={2} mb={2} w="auto" bg="gray.300">{tag.value}</Tag>
          })}
      </Box>
  );
};
