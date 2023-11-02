import FormEditUser from "@/components/FormEditUser";
import React from "react";

function Page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <FormEditUser userId={params.userId} />
    </div>
  );
}

export default Page;
