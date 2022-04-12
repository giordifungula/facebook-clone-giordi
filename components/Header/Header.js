import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlayIcon,
  ShoppingCartIcon,
  FlagIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import {
  BellIcon,
  ChatIcon,
  ChevronDoubleDownIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import HeaderIcon from "./HeaderIcon";
// next auth
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// components
import Login from "../Auth/Login/Login";

export default function Header() {
  const { data: session } = useSession();

  if (!session) return <Login />;

  return (
    <div className="sticky top-0 flex bg-white items-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 w-100 text-gray text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hidden md:inline-flex bg-transparent ml-2 items-center outline-none placeholder-gray-500 flex-shrink"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profie Pic */}

        <Image
          src={session?.user.image}
          className="rounded-full cursor-pointer"
          width={40}
          height={40}
          layout="fixed"
          onClick={signOut}
        />

        {/*  */}
        <p className="whitespace-nowrap font-semibold pr-3">Giordi Fungula</p>
        {/* TODO to add the proper icon colors */}
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDoubleDownIcon className="icon" />
      </div>
    </div>
  );
}
