"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ListPost() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const token =
    "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

  useEffect(() => {
    setIsLoading(true);
    const retrievePosts = async () => {
      try {
        const res = await fetch("https://gorest.co.in/public/v2/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Data is not found!");
        const data = await res.json();
        console.log(data);
        setPostList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    retrievePosts();
  }, []);

  const handleRouteDetail = (id: any) => {
    router.push(`post/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Link href={"/"} className="text-gray-500">
          Post
        </Link>
        <p className="text-gray-500">&gt;</p>
        <Link href={"/"} className="text-gray-500">
          List
        </Link>
      </div>
      <p className="text-white text-4xl font-bold">Posts</p>
      {isLoading ? (
        <p className="text-white">Loading</p>
      ) : (
        <div className="flex flex-col gap-8">
          {postList &&
            postList.length > 0 &&
            postList.map((post: any, index) => (
              <Card
                className="bg-transparent border border-gray-500"
                key={index}
              >
                <CardHeader className="flex flex-row gap-6 items-center">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-white text-2xl">
                      {post.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-md">{post.body}</p>
                </CardContent>
                <CardFooter className="pt-6 flex justify-start">
                  <Button
                    className="bg-white text-black hover:text-white"
                    onClick={() => handleRouteDetail(post.id)}
                  >
                    Detail
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default ListPost;
