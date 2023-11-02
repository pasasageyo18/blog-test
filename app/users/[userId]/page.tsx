import UserDetail from "@/components/UserDetail";
import React from "react";

function Page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <UserDetail userId={params.userId} />
    </div>
  );
}

export default Page;
