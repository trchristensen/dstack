import React from 'react';
import ReactMarkdown from 'react-markdown';
// probably dont need this in prod because not going to allow html in editor.
import rehypeRaw from "rehype-raw";

const MarkDown = ({ children }) => {
return (
  <React.Fragment>
    <Styles />
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
  </React.Fragment>
);

}


const Styles = () => (
  <style jsx>
    {`
      #markdown blockquote,
      #markdown dl,
      #markdown dd,
      #markdown h1,
      #markdown h2,
      #markdown h3,
      #markdown h4,
      #markdown h5,
      #markdown h6,
      #markdown hr,
      #markdown figure,
      #markdown p,
      #markdown pre {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }
      #markdown ul,
      #markdown ol {
          margin-left: 1em;
      }
    `}
  </style>)

  
export default MarkDown;