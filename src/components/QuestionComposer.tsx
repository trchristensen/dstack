import React from "react";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { sendPostRequest } from "../lib/dhive";

export default function QuestionComposer() {

  const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [text, setText] = React.useState('');
    const [html, setHtml] = React.useState('');
    const [title, setTitle] = React.useState('');

    function handleEditorChange({ html, text }) {
      console.log("handleEditorChange", html, text);
      setHtml(html);
      setText(text)
    
    }

    function handleSubmit(e) {
      e.preventDefault();

      const taglist = ["garbage post", "boracay", "philippines"];

      const payload = {
        account_name: "ipeeyay",
        title,
        body: text,
        parent_permlink: "dstack",
        parent_author: "",
        json_metadata: JSON.stringify({
          tags: taglist,
          app: "dstack/0.1",
        }),
        permlink: Math.random().toString(36).substring(2),
        comment_options: ""
      }

      sendPostRequest(payload);
    }

    

  return (
    <Box w="100%">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl mb={8}>
          <Text as="h3" fontWeight="600" fontSize="md" lineHeight="1">
            Title
          </Text>
          <FormLabel mb={0} fontSize="sm">
            Be specific and imagine you’re asking a question to another person
          </FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Be specific"
          />
        </FormControl>
        <FormControl mb={8}>
          <Text as="h3" fontWeight="600" fontSize="md" lineHeight="1">
            Body
          </Text>
          <FormLabel mb={0} fontSize="sm">
            Include all the information someone would need to answer your
            question
          </FormLabel>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </FormControl>
        <FormControl>
          <Button onClick={(e) => handleSubmit(e)}>Post your question</Button>
        </FormControl>
        {text}
      </form>
    </Box>
  );
}
