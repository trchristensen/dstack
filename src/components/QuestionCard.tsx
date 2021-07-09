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
import { formatDistanceToNow, formatDistanceToNowStrict, parseISO } from "date-fns";
import { Router } from "next/router";
// import { convertDateTimeToUTC } from "../utils";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import ReactMarkdown from "react-markdown";

const QuestionCard = (props) => {
  // const metadata = JSON.parse(props.json_metadata);
  const metadata = props.json_metadata;


  return (
    <Box
      w="100%"
      px={3}
      py={3}
      pb={1}
      pl={1}
      d="flex"
      flexWrap="nowrap"
      // flexDir="row"
      alignItems="stretch"
      borderBottomWidth={1}
      flexDir={["column", "column", "row"]}
    >
      <Box
        minW="132"
        h="100%"
        color="gray.600"
        d="flex"
        flexDirection="row"
        justifyContent="flex-center"
      >
        <Stack
          color="gray.500"
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={0}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
          direction={["row", "row", "column"]}
          alignItems="center"
        >
          <Text as="span">{props.children}</Text>
          <Text lineHeight="1" fontSize="md" as="span">
            <Icon as={RiQuestionAnswerLine} />
          </Text>
        </Stack>
        <Stack
          color="gray.500"
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={0}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
          direction={["row", "row", "column"]}
          alignItems="center"
        >
          <Text as="span">{props.active_votes.length}</Text>
          <Text lineHeight="1" fontSize="md" as="span">
            <Icon as={RiHeartLine} />
          </Text>
        </Stack>

        <Stack
          color="gray.500"
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={0}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
          direction={["row", "row", "column"]}
          // fontSize=".95rem"
          alignItems="center"
        >
          <Text as="span">
            {parseInt(props.promoted) == 0
              ? "0"
              : props.promoted.slice(0, props.promoted.length - 6)}
          </Text>
          <Text lineHeight="1" fontSize="md" as="span">
            {/* <Icon as={RiStackLine} /> */}
            <Icon as={RiRocketLine} />
          </Text>
        </Stack>
      </Box>
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
              mb={1}
              noOfLines={2}
              title={props.title}
            >
              {props.title}
            </Text>
          </a>
        </Link>
        {/* <Text maxW={["100%", "100%", "540px"]} fontSize="sm" noOfLines={2}>
          {props.body}
        </Text> */}
        <Box
          id="lower-details"
          d="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexDir={["column", "column", "row"]}
        >
          <HStack spacing={"6px"} mt={2} flexWrap="wrap">
            {metadata.tags.slice(0, 5).map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a>
                  <Tag
                    size="sm"
                    key={tag}
                    variant="ghost"
                    bg="gray.100"
                    color="gray.600"
                    fontWeight="400"
                  >
                    {tag}
                  </Tag>
                </a>
              </Link>
            ))}
            {metadata.tags.length > 6 && (
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
            id="user-details"
            textAlign="right"
            height="100%"
            minWidth="120px"
            alignItems="flex-end"
            w={["100%", "100%", "auto"]}
            // flexShrink={0}
          >
            <Stack
              spacing={0}
              lineHeight="1.2"
              height="100%"
              justifyContent="flex-end"
              flexShrink={0}
            >
              <Box>
                <Avatar
                  src={`https://images.hive.blog/u/${props.author}/avatar/small`}
                  size="sm"
                />
              </Box>
              <Link href="#">
                <a>
                  <Text color="gray.600" fontSize="xs" as="span">
                    {props.author}
                  </Text>
                  <Text color="gray.600" fontSize="xs" as="span">
                    {" ◦ "}
                    {Math.trunc(
                      (Math.log10(Math.abs(props.author_reputation)) - 9) * 9 +
                        25
                    )}
                  </Text>
                </a>
              </Link>
              <Box mb={-1.5}>
                <Text
                  color="gray.600"
                  as="span"
                  fontSize="xs"
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
  );
};

export default QuestionCard;
