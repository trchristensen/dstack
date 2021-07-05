import React from 'react';
import MDEditor, { commands } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";


export default function QuestionComposer({...props}) {

    const [value, setValue] = React.useState(props.value);
    
    return (
      <React.Fragment>
        <MDEditor value={value} onChange={setValue} />
        <MDEditor.Markdown source={value} />
      </React.Fragment>
    );
}