import React from "react";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import MarkdownEditor from './MarkdownEditor';

export default function QuestionComposer() {

    const [value, setValue] = React.useState()
  return (
    <Box w="100%">
      <form onSubmit={() => alert('not submitted!')}>
        <FormControl mb={8}>
          <Text as="h3" fontWeight="600" fontSize="md" lineHeight="1">
            Title
          </Text>
          <FormLabel mb={0} fontSize="sm">
            Be specific and imagine you’re asking a question to another person
          </FormLabel>
          <Input placeholder="Be specific" />
        </FormControl>
        <FormControl mb={8}>
          <Text as="h3" fontWeight="600" fontSize="md" lineHeight="1">
            Body
          </Text>
          <FormLabel mb={0} fontSize="sm">
            Include all the information someone would need to answer your
            question
          </FormLabel>
          <MarkdownEditor {...value} />
        </FormControl>
        <FormControl>
            <Button>Post your question</Button>
        </FormControl>
      </form>
    </Box>
  );
}
