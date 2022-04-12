import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase/firestore";
import Post from "../Post";

export default function Posts({ postsList }) {
  const postCollections = collection(db, "posts");
  const [posts, loading, error] = useCollection(postCollections);

  console.log("postList from server", postsList);

  return (
    <div>
      {posts
        ? posts.docs?.map((post) => {
            return (
              <Post
                key={post.id}
                name={post.data().name}
                message={post.data().message}
                email={post.data().email}
                timeStamp={post.data().timeStamp}
                image={post.data().image}
                postImage={post.data().postImage}
              />
            );
          })
        : postsList.map((post) => {
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timeStamp={post.timeStamp}
              image={post.image}
              postImage={post.postImage}
            />;
          })}
    </div>
  );
}
