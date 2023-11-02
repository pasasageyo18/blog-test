"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function FormEditUser({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  const router = useRouter();

  const token =
    "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

  useEffect(() => {
    setIsLoading(true);
    const retrieveSpecificUser = async () => {
      try {
        const userSpecificResponse = await fetch(
          `https://gorest.co.in/public/v2/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userSpecificData = await userSpecificResponse.json();
        setUser(userSpecificData);
        setName((userSpecificData as any).name);
        setEmail((userSpecificData as any).email);
        setGender((userSpecificData as any).gender);
        setStatus((userSpecificData as any).status);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveSpecificUser();
  }, [userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      status: status,
    });

    try {
      const newUserResponse = await fetch(
        `https://gorest.co.in/public/v2/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      console.log(newUserResponse);
      if (!newUserResponse.ok) throw new Error("Can't update the data");
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Link href={"/users"} className="text-gray-500">
          Users
        </Link>
        <p className="text-gray-500">&gt;</p>
        <Link href={`/users/${userId}/edit`} className="text-gray-500">
          Edit
        </Link>
      </div>
      <p className="text-white text-4xl font-bold">Edit User</p>
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {user ? (
            <>
              <div className="gap-6 mb-6 flex max-md:flex-col">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    type="name"
                    id="name"
                    className="bg-transparent text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    className="bg-transparent text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="gap-6 mb-6 flex">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name" className="text-white">
                    Gender
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-transparent justify-between hover:bg-blue-500"
                      >
                        <p className="text-white">{gender}</p>
                        <Image
                          src="/assets/icons/chevron-down.png"
                          alt="chevron"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Set Gender</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={gender}
                        onValueChange={setGender}
                      >
                        <DropdownMenuRadioItem value="male">
                          Male
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="female">
                          Female
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name" className="text-white">
                    Status
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-transparent justify-between hover:bg-blue-500"
                      >
                        <p className="text-white">{status}</p>
                        <Image
                          src="/assets/icons/chevron-down.png"
                          alt="chevron"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={status}
                        onValueChange={setStatus}
                      >
                        <DropdownMenuRadioItem value="active">
                          Active
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="inactive">
                          Inactive
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Button type="submit" variant="outline">
                Submit
              </Button>
            </>
          ) : (
            <p className="text-white">User not found</p>
          )}
        </form>
      )}
    </div>
  );
}

export default FormEditUser;
