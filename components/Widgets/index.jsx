import React from "react";
import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import {
  DotsCircleHorizontalIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import Contact from "../Contact";

let data = [
  {
    name: "Elon Musk",
    image: "https://links.papareact.com/4zn",
    src: "",
  },
  {
    name: "Mark Zuckerberg",
    image: "https://links.papareact.com/xql",
    src: "",
  },
  {
    name: "Jeff Bezos",
    image: "https://links.papareact.com/f0p",
    src: "",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/zvy",
    image: "https://links.papareact.com/zvy",
  },
  {
    name: "Giordi Fungula",
    src: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5354308687913962&height=50&width=50&ext=1652252036&hash=AeTWm841794JYmCGHEU",
    image: "https://links.papareact.com/zvy",
  },
];

export default function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-60 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {data.map((contact) => (
        <Contact key={contact.src} src={contact.image} name={contact.name} />
      ))}
    </div>
  );
}
