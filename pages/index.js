import Head from "next/head";
import Header from "../components/Header/Header";
import Login from "../components/Auth/Login/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../components/Feed";
import { getSession } from "next-auth/react";
import Widgets from "../components/Widgets";
// firebase imports
import { useCollection } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
} from "@firebase/firestore";
import { db } from "../firebase/firestore";

export default function Home(props) {
  const { userSession, postsList } = props;
  if (!userSession) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Face book clone</title>
      </Head>

      <Header />
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed postsList={postsList} />

        <Widgets />

        {/* Widget */}
      </main>
    </div>
  );
}

// Server side rendering for this page

export async function getServerSideProps(context) {
  // get session from logged in user
  const session = await getSession(context);

  const postCollections = collection(db, "posts");

  const data = await getDocs(postCollections);
  const getAllPosts = data.docs.map((post) => ({
    ...post.data(),
    timeStamp: null,
  }));

  return {
    props: {
      userSession: session,
      postsList: getAllPosts,
      // todo this props will be passed to the page component as pageProps
    },
  };
}
