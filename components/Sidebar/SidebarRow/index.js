import React from "react";
import Image from "next/image";

export default function SideBarRow({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          src={src}
          alt="profile"
          className="rounded-full"
          height={40}
          width={40}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-6 w-8 text-blue-500" />}
      <p className="hidden lg:inline-flex font-medium">{title}</p>
    </div>
  );
}
