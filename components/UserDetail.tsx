"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const token =
  "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

function UserDetail({ userId }: { userId: string }) {
  const [userSpecific, setUserSpecific] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const retrieveSpecificUser = async () => {
      try {
        const userResponse = await fetch(
          `https://gorest.co.in/public/v2/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(userResponse);
        if (!userResponse.ok) throw new Error("User not found!");
        const userData = await userResponse.json();
        console.log(userData);
        setUserSpecific(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveSpecificUser();
  }, [userId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Link href={"/users"} className="text-gray-500">
          Users
        </Link>
        <p className="text-gray-500">&gt;</p>
        <Link href={`/users/${userId}`} className="text-gray-500">
          View
        </Link>
      </div>
      <p className="text-white text-4xl font-bold">Detail User</p>
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {userSpecific ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between max-lg:flex-col max-lg:gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <p className="text-white text-2xl font-semibold">ID</p>
                  <p className="text-gray-300 text-lg font-medium">
                    {(userSpecific as any).id}
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <p className="text-white text-2xl font-semibold">Name</p>
                  <p className="text-gray-300 text-lg font-medium">
                    {(userSpecific as any).name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between max-lg:flex-col max-lg:gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <p className="text-white text-2xl font-semibold">Email</p>
                  <p className="text-gray-300 text-lg font-medium">
                    {(userSpecific as any).email}
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <p className="text-white text-2xl font-semibold">Gender</p>
                  <p className="text-gray-300 text-lg font-medium">
                    {(userSpecific as any).gender}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <p className="text-white text-2xl font-semibold">Status</p>
                <p className="text-gray-300 text-lg font-medium">
                  {(userSpecific as any).status}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-white">User not Found</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserDetail;
