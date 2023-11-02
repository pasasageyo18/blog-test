"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ListUsers() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const token =
    "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

  useEffect(() => {
    setIsLoading(true);
    const retrieveUsers = async () => {
      try {
        const res = await fetch("https://gorest.co.in/public/v2/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) new Error("Data is not found!");
        const data = await res.json();
        setUserList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveUsers();
  }, []);

  const handleRouteDetail = (id: any) => {
    router.push(`users/${id}`);
  };
  const handleRouteEdit = (id: any) => {
    router.push(`users/${id}/edit`);
  };
  const handleRouteCreate = () => {
    router.push(`users/create`);
  };

  const handleDeleteData = async (id: number) => {
    const confirmed = confirm("Are you sure");

    if (confirmed) {
      const deleteResponse = await fetch(
        `https://gorest.co.in/public/v2/users/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!deleteResponse.ok) throw new Error("Can't delete the data");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Link href={"/"} className="text-gray-500">
          User
        </Link>
        <p className="text-gray-500">&gt;</p>
        <Link href={"/"} className="text-gray-500">
          List
        </Link>
      </div>
      <div className="flex justify-between">
        <p className="text-white text-4xl font-bold">Users</p>
        <Button
          className="bg-white text-black hover:text-white"
          onClick={() => handleRouteCreate()}
        >
          New User
        </Button>
      </div>
      {isLoading ? (
        <p className="text-white">Loading</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-white font-semibold text-lg">
                  ID
                </TableHead>
                <TableHead className="text-center text-white font-semibold text-lg">
                  Name
                </TableHead>
                <TableHead className="text-center text-white font-semibold text-lg">
                  Gender
                </TableHead>
                <TableHead className="text-center text-white font-semibold text-lg">
                  Status
                </TableHead>
                <TableHead className="text-center text-white font-semibold text-lg">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList &&
                userList.length > 0 &&
                userList.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-white text-center">
                      {user.id}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {user.gender}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {user.status}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <div className="flex">
                        <Button
                          variant="link"
                          className="flex gap-2"
                          onClick={() => handleRouteDetail(user.id)}
                        >
                          <Image
                            src="/assets/icons/eye-icon.png"
                            alt="view"
                            width={20}
                            height={20}
                          />
                          <p className="text-white">View</p>
                        </Button>
                        <Button
                          variant="link"
                          className="flex gap-2"
                          onClick={() => handleRouteEdit(user.id)}
                        >
                          <Image
                            src="/assets/icons/edit-icon.png"
                            alt="edit"
                            width={20}
                            height={20}
                          />
                          <p className="text-white">Edit</p>
                        </Button>
                        <Button
                          variant="link"
                          className="flex gap-2"
                          onClick={() => handleDeleteData(user.id)}
                        >
                          <Image
                            src="/assets/icons/trash-icon.png"
                            alt="delete"
                            width={20}
                            height={20}
                          />
                          <p className="text-white">Delete</p>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ListUsers;
