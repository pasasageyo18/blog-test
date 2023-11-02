"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

function FormCreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");

  const router = useRouter();

  const token =
    "f52b8ce702b7fd8607dec738ded396879210a5536a3ef20567e00f02f859e81c";

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      status: status,
    });
    try {
      const createResponse = await fetch(
        `https://gorest.co.in/public/v2/users`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      if (!createResponse.ok) throw new Error("Can't create the data");
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
        <Link href={`/users/create`} className="text-gray-500">
          Create
        </Link>
      </div>
      <p className="text-white text-4xl font-bold">Edit Post</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="gap-6 mb-6 flex">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              type="name"
              id="name"
              className="bg-transparent text-white"
              value={name}
              placeholder="name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="bg-transparent text-white"
              placeholder="email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="gap-6 mb-6 flex">
          <div className="grid w-full max-w-sm items-center gap-1.5">
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
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
      </form>
    </div>
  );
}

export default FormCreateUser;
