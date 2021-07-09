import React from "react";
import { Text, Box, Stack, HStack, Tag, Avatar, Icon } from "@chakra-ui/react";
import Link from "next/link";
import {
  RiAwardLine,
  RiQuestionAnswerLine,
  RiGasStationLine,
  RiHeartLine,
  RiStackLine,
  RiRocketLine,
} from "react-icons/ri";

import { FaExpandAlt } from "react-icons/fa";
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";
import { Router } from "next/router";
// import { convertDateTimeToUTC } from "../utils";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import HiveIcon from "../public/hive-blockchain-hive-logo.svg";

const QuestionCard = (props) => {
  // const metadata = JSON.parse(props.json_metadata);
  const metadata = props.json_metadata;

  const [bodyToggle, setBodyToggle] = React.useState(false)

  return (
    <Box
      w="100%"
      px={3}
      py={3}
      pb={1}
      d="flex"
      flexWrap="nowrap"
      // flexDir="row"
      alignItems="stretch"
      // borderBottomWidth={1}
      flexDir={["column", "column", "row"]}
      // bg="gray.100"
    >
      <Box w="100%" borderBottomWidth={1}>
        <Box
          px={2}
          w="100%"
          d="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Link href={`/questions/${props.author}/${props.permlink}`}>
            <a>
              <Text
                color="gray.700"
                as="h3"
                fontSize={["md", "md", "lg"]}
                lineHeight="1.3"
                fontWeight="600"
                mb={1}
                noOfLines={2}
                title={props.title}
              >
                {props.title}
              </Text>
            </a>
          </Link>
          <Box style={{ display: bodyToggle ? `flex` : `none` }}>
            <Text maxW={["100%", "100%", "750px"]} fontSize="sm">
              {props.body}
            </Text>
          </Box>
          <Box
            id="lower-details"
            d="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            // flexDir={["column", "column", "row"]}
            flexDir="column"
          >
            <HStack spacing={1} mt={1} mb={4} flexWrap="wrap">
              {metadata.tags.slice(0, 9).map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a>
                    <Tag
                      size="md"
                      key={tag}
                      variant="ghost"
                      bg="gray.50"
                      color="gray.600"
                      fontWeight="400"
                    >
                      {tag}
                    </Tag>
                  </a>
                </Link>
              ))}
              {metadata.tags.length > 10 && (
                <Link href="#">
                  <a>
                    <Tag
                      size="sm"
                      variant="ghost"
                      bg="gray.100"
                      color="gray.600"
                      fontWeight="400"
                    >
                      ...
                    </Tag>
                  </a>
                </Link>
              )}
            </HStack>
            <Box
              w="100%"
              d="flex"
              flexDir="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Box
                h="100%"
                color="gray.600"
                d="flex"
                flexDirection="row"
                justifyContent="flex-center"
                paddingRight={2}
                fontSize="20px"
              >
                <Stack
                  textAlign="center"
                  w="auto"
                  rounded="md"
                  px={0}
                  py={2}
                  pt={0}
                  mr={4}
                  mb={0}
                  pb={0}
                  spacing={1}
                  justifyContent="flex-end"
                  // direction={["row", "row", "column"]}
                  direction="row"
                  alignItems="center"
                >
                  <Box
                    onClick={() => setBodyToggle(!bodyToggle)}
                    borderRightWidth={1}
                    pr={4}
                    pb={1}
                    pl={2}
                    cursor="pointer"
                  >
                    <Icon color="gray.500" as={FaExpandAlt} />
                  </Box>
                </Stack>
                <Stack
                  textAlign="center"
                  w="auto"
                  rounded="md"
                  px={0}
                  py={2}
                  pt={0}
                  mr={4}
                  mb={0}
                  pb={0}
                  spacing={1}
                  justifyContent="flex-end"
                  // direction={["row", "row", "column"]}
                  direction="row"
                  alignItems="center"
                >
                  <Icon as={RiQuestionAnswerLine} />

                  <Text as="span">{props.children}</Text>
                </Stack>
                <Stack
                  textAlign="center"
                  w="auto"
                  rounded="md"
                  px={0}
                  py={2}
                  pt={0}
                  mr={4}
                  mb={0}
                  pb={0}
                  spacing={1}
                  justifyContent="flex-end"
                  // direction={["row", "row", "column"]}
                  direction="row"
                  alignItems="center"
                >
                  <Icon as={RiHeartLine} />

                  <Text as="span">{props.active_votes.length}</Text>
                </Stack>

                <Stack
                  textAlign="center"
                  w="auto"
                  rounded="md"
                  px={0}
                  py={2}
                  pt={0}
                  mr={4}
                  mb={0}
                  pb={0}
                  spacing={1}
                  justifyContent="flex-end"
                  // direction={["row", "row", "column"]}
                  direction="row"
                  // fontSize=".95rem"
                  alignItems="center"
                >
                  {/* <Icon as={RiStackLine} /> */}
                  <Icon as={RiRocketLine} />

                  <Text as="span">
                    {parseInt(props.promoted) == 0
                      ? "0"
                      : props.promoted.slice(0, props.promoted.length - 6)}
                  </Text>
                </Stack>
                <Stack
                  textAlign="center"
                  w="auto"
                  rounded="md"
                  px={0}
                  py={2}
                  pt={0}
                  mr={4}
                  mb={0}
                  pb={0}
                  spacing={1}
                  justifyContent="flex-end"
                  // direction={["row", "row", "column"]}
                  direction="row"
                  alignItems="center"
                >
                  <HiveIcon width="20" height="20w" />
                  <Text as="span">{props.payout}</Text>
                </Stack>
              </Box>
              <Box
                id="user-details"
                textAlign="right"
                height="100%"
                minWidth="120px"
                alignItems="flex-end"
                w={["100%", "100%", "auto"]}
                pb={1}
                // flexShrink={0}
              >
                <Stack
                  spacing={0}
                  lineHeight="1.2"
                  height="100%"
                  justifyContent="flex-end"
                  flexShrink={0}
                  flexDirection="row"
                >
                  <Box>
                    <Link href="#">
                      <a>
                        <Text
                          color="gray.600"
                          fontWeight="semibold"
                          fontSize="sm"
                          as="span"
                        >
                          {props.author}
                        </Text>
                        <Text color="gray.600" fontSize="sm" as="span">
                          {" ◦ "}
                          {props.author_reputation}
                        </Text>
                      </a>
                    </Link>
                    <Box mb={-1.5}>
                      <Text
                        color="gray.600"
                        as="span"
                        fontSize="sm"
                        textAlign="right"
                        display="flex"
                        flexWrap="nowrap"
                        flexShrink={0}
                        float="right"
                      >
                        {props.updated == props.created
                          ? `created `
                          : `updated `}

                        {props.updated}
                      </Text>
                    </Box>
                  </Box>
                  <Box pl={1}>
                    <Avatar
                      src={`https://images.hive.blog/u/${props.author}/avatar/small`}
                      size="sm"
                    />
                  </Box>
                </Stack>
                {/* <HStack mb={0} spacing={1} justify="flex-end" color="gray.600">
              <Text fontSize="xs" as="span">
                Ξ0.004
              </Text>
              <Text lineHeight="0.75" fontSize="xs" as="span">
                <Icon as={RiGasStationLine} />
              </Text>
            </HStack> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCard;
