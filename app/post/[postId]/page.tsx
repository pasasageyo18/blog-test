import PostDetail from "@/components/PostDetail";
import React from "react";

function Page({ params }: { params: { postId: string } }) {
  return (
    <div>
      <PostDetail postId={params.postId} />
    </div>
  );
}

export default Page;
