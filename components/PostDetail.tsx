"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

function PostDetail({ postId }: { postId: string }) {
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState();
  const [isError, setIsError] = useState();

  const token =
    "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

  useEffect(() => {
    setIsLoading(true);
    const retrieveUserWithPost = async () => {
      try {
        const postResponse = await fetch(
          `https://gorest.co.in/public/v2/posts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!postResponse.ok) throw new Error("Post is not found!");
        const postData = await postResponse.json();
        const specificPost = await postData.find(
          (post: any) => post.id === Number(postId)
        );
        setPost(specificPost);

        const commentsResponse = await fetch(
          `https://gorest.co.in/public/v2/comments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!commentsResponse.ok) throw new Error("Comment is not found!");
        const commentData = await commentsResponse.json();
        const specificComment = await commentData.find(
          (comments: any) => comments.post_id === specificPost.id
        );
        setComment(specificComment);

        const userResponse = await fetch(
          `https://gorest.co.in/public/v2/users/${specificPost.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!userResponse.ok) throw new Error("User is not found!");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveUserWithPost();
  }, [postId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Link href={"/"} className="text-gray-500">
          Post
        </Link>
        <p className="text-gray-500">&gt;</p>
        <Link href={`/post/${postId}`} className="text-gray-500">
          View
        </Link>
      </div>
      <p className="text-white text-4xl font-bold">Detail Post</p>
      {isLoading ? (
        <p className="text-white">loading</p>
      ) : (
        <>
          <Card className="bg-transparent">
            {user ? (
              <CardHeader className="flex flex-row gap-6 items-center">
                <Avatar>
                  <AvatarFallback>
                    {(user as any).name?.split("", 2).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-white">
                    {(user as any).name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {(user as any).email}
                  </CardDescription>
                </div>
              </CardHeader>
            ) : (
              <CardHeader>
                <CardTitle>
                  <p className="text-white text-2xl">User Not Found</p>
                </CardTitle>
              </CardHeader>
            )}
            {post ? (
              <CardContent className="flex flex-col gap-2">
                <p className="text-white text-xl font-bold">
                  {(post as any).title}
                </p>
                <p className="text-gray-300 text-lg text-justify">
                  {(post as any).body}
                </p>
              </CardContent>
            ) : (
              <CardContent>
                <p className="text-white text-lg">Post Not Found</p>
              </CardContent>
            )}
            <div className="px-6">
              <Separator className="bg-gray-500" />
            </div>
            <CardFooter className="pt-6 flex flex-col">
              <p className="text-white text-2xl text-start font-semibold w-full">
                Comments
              </p>
              {comment ? (
                <Card className="bg-transparent w-full border-none">
                  <CardHeader className="flex flex-row gap-6 items-center">
                    <Avatar>
                      <AvatarFallback>
                        {(comment as any).name
                          .split("", 2)
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-white">
                        {(comment as any).name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {(comment as any).email}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white text-lg text-justify">
                      {(comment as any).body}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-white text-lg">No Comments</p>
              )}
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}

export default PostDetail;
