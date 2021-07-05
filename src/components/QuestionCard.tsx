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

const QuestionCard = (props) => {
  const metadata = JSON.parse(props.json_metadata);

  return (
    <Box
      w="100%"
      px={3}
      py={3}
      pb={1}
      d="flex"
      flexWrap="nowrap"
      flexDir="row"
      alignItems="stretch"
      borderBottomWidth={1}
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
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={1}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
        >
          <Text as="span">{props.active_votes.length}</Text>
          <Text lineHeight="1" fontSize="md" as="span">
            <Icon as={RiQuestionAnswerLine} />
          </Text>
        </Stack>
        <Stack
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={1}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
        >
          <Text as="span">{props.replies.length}</Text>
          <Text lineHeight="1" fontSize="md" as="span">
            <Icon as={RiHeartLine} />
          </Text>
        </Stack>

        <Stack
          textAlign="center"
          minW="44px"
          // bg="red.200"
          rounded="md"
          px={1}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="flex-start"
          fontSize="1.30769231rem"
          // fontSize=".95rem"
        >
          <Text as="span">
            {
            parseInt(props.promoted) == 0 ? "0" :
            props.promoted.slice(
              0,
              props.promoted.length - 6
            )}
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
        <Link href={`/questions/${props.post_id}/${props.title}`}>
          <a>
            <Text
              color="blue.500"
              as="h3"
              fontSize="lg"
              lineHeight="1.3"
              mb={1}
            >
              {props.title}
            </Text>
          </a>
        </Link>
        {/* <Text as="div" fontSize="sm">
          {props.body.slice(0, 198)} ...
        </Text> */}
        <Box
          id="lower-details"
          d="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <HStack spacing={2} mt={2} flexWrap="wrap">
            {metadata.tags.map((tag) => (
              <Link href={`/tags/${tag}`}>
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
          </HStack>
          <Box id="user-details" textAlign="right">
            <Stack spacing={0} lineHeight="1">
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
                >
                  {props.last_update == props.created
                    ? `created `
                    : `modified `}

                  {formatDistanceToNowStrict(parseISO(`${props.last_update}`), {
                    addSuffix: true,
                  })}
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
