import React from "react";
import StoryCard from "./StoryCard";

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
];

export default function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {data.map((story) => (
        <StoryCard key={story.image} src={story.image} name={story.name} />
      ))}
    </div>
  );
}
