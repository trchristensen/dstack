import React from "react";
import { Text, Box, Stack, HStack, Tag, Avatar, Icon } from "@chakra-ui/react";
import Link from "next/link";
import {
  RiAwardLine,
  RiQuestionAnswerLine,
  RiGasStationLine,
} from "react-icons/ri";

const QuestionCard = (props) => {
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
        minW="100"
        h="100%"
        color="gray.600"
        d="flex"
        flexDirection="column"
        justifyContent="flex-center"
      >
        <HStack
          className={props.answered ? `answered` : `unanswered`}
          rounded="md"
          borderColor="blue.500"
          px={1}
          py={2}
          pt={0}
          mb={0}
          spacing={1}
          justifyContent="center"
          fontSize="lg"
        >
          <Text as="span">{props.answerCount}</Text>
          <Text lineHeight="0.75" as="span">
            <Icon as={RiQuestionAnswerLine} />
          </Text>
        </HStack>
        <HStack mb={2} spacing={1} justifyContent="center">
          <Text fontSize="md" as="span">
            Ξ0.050
          </Text>
          <Text lineHeight="0.75" fontSize="sm" as="span">
            <Icon as={RiAwardLine} />
          </Text>
        </HStack>
      </Box>
      <Box
        px={2}
        w="100%"
        d="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Link href={`/questions/${props.id}/${props.title}`}>
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
          <HStack spacing={2} mt={2}>
            {props.tags.map((tag) => (
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
                    {props.author.address.slice(0, 6)}...
                    {props.author.address.slice(-4)}
                  </Text>
                  <Text color="gray.600" fontSize="xs" as="span">
                    {" ◦ "}
                    Ξ0.149
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
                  Asked: 10 minutes ago
                </Text>
              </Box>
            </Stack>
            <HStack mb={0} spacing={1} justify="flex-end" color="gray.600">
              <Text fontSize="xs" as="span">
                Ξ0.004
              </Text>
              <Text lineHeight="0.75" fontSize="xs" as="span">
                <Icon as={RiGasStationLine} />
              </Text>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCard;
