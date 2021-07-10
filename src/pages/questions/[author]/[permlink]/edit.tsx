import React from "react";
import QuestionComposer from "../../../../components/QuestionComposer";
import TwoColumnTemplate from "../../../../components/templates/TwoColumn.Template";
import { AuthContext } from "../../../../lib/AuthProvider";
import { getPost } from "../../../../lib/dhive";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  // console.log("context", context);
  const post = await getPost(context.query.author, context.query.permlink);
  return { props: { post } };
}

export default function EditPage({ post }) {
  const { user } = React.useContext(AuthContext);
  
  const router = useRouter();
  // React.useEffect(() => {
  //   if (!router.isReady) return;
  //   if (user != post.author) {
  //     router.push("/");
  //   }
  // }, [router.isReady]);
  
  if (!user || user != post.author) {
    return "Loading..."
  }
  return <TwoColumnTemplate main={<QuestionComposer post={post} />} />;
}
