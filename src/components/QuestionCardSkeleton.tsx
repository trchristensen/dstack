import { Box } from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import React from 'react';

const QuestionCardSkeleton = () => {
    return (
      <Box padding="6"  bg="white" d="flex" flexDirection="row">
        <Box w="100px">
          <SkeletonText mt="4" noOfLines={1} spacing="4" />
          <SkeletonText mt="4" noOfLines={1} spacing="4" />
          <SkeletonText mt="4" noOfLines={1} spacing="4" />
        </Box>
        <Box w="calc(100% - 100px)" ml={4}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SkeletonCircle size="10" float="right" />
        </Box>
      </Box>
    );
}

export default QuestionCardSkeleton;

export const HalfQuestionCardSkeleton = () => {
  return (
    <Box padding="6" pb={0} bg="white" d="flex" flexDirection="row">
      <Box w="100px">
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
      </Box>
      <Box w="calc(100% - 100px)" ml={4}>
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    </Box>
  );
}