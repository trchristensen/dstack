import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { sendPostRequest } from "../lib/dhive";
import { AuthContext } from "../lib/AuthProvider";
import CreatableSelect from "react-select/creatable";
import dynamic from "next/dynamic";

export default function QuestionComposer({ post = null }) {
  const { user, setUser } = React.useContext(AuthContext);
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [text, setText] = React.useState(
    post ? post.body : "Explain your question further here, on the left side. "
  );
  // const [html, setHtml] = React.useState("");
  const [title, setTitle] = React.useState(post ? post.title : "");

  let selectFormTags;
  if(post) {
    selectFormTags = JSON.parse(post.json_metadata).tags.map((tag) => {
      return {
        value: tag.replace("dstack-", ""),
        label: tag.replace("dstack-", ""),
      };
    });
  }
    
  const [tags, setTags] = React.useState(post ? selectFormTags : []);

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
    // setHtml(html);
    setText(text);
  }
  function handleTagsChange(newValue: any, actionMeta: any) {
    setTags(newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // convert taglist to strings[] instead of objects[]
    let convertedTags = tags.map((tag) => `dstack-${tag.value}`);


    const payload = {
      account_name: user,
      title,
      body: text,
      parent_permlink: "dstack",
      parent_author: "",
      json_metadata: JSON.stringify({
        tags: convertedTags,
        app: "dstack/0.1",
      }),
      // permlink: post ? post.permlink : Math.random().toString(36).substring(2),
      permlink: post.permlink,
      comment_options: "",
    };

    sendPostRequest(payload);
  }

  return (
    <Box w="100%" p={4}>
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
            value={text}
          />
        </FormControl>
        <FormControl mb={6}>
          <Text as="h3" fontWeight="600" fontSize="md">
            Tags
          </Text>
          <CreatableSelect
            isMulti
            onChange={handleTagsChange}
            options={null}
            placeholder="Add tags"
            defaultValue={selectFormTags}
          />
        </FormControl>
        <FormControl>
          <Button bg="gray.500" color="white" onClick={(e) => handleSubmit(e)}>
            Post your question
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
