import React from "react";
import Image from "next/image";
import { db } from "../../firebase/firestore";
import { ref } from "@firebase/storage";
import { storage } from "../../firebase/storage";
import {
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
//  Icons
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { v4 } from "uuid";

export default function InputBox() {
  const { data: session } = useSession();

  const inputRef = React.useRef(null);
  const filePickerRef = React.useRef(null);

  const [imageToPost, setImageToPost] = React.useState(null);

  const uploadFile = (e) => {
    e.preventDefault();
    console.log("uplaoding file");
    if (imageToPost == null) return;
    const imageRef = ref(storage, `images/uploads/${imageToPost.name + v4()}`);
    uploadBytes(imageRef, imageToPost).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("new url", url);
        // setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value && !imageToPost == null) return;

    const collectionRef = collection(db, "posts");

    await addDoc(collectionRef, {
      message: inputRef.current.value,
      name: session.user.name,
      image: session.user.image,
      email: session.user.email,
      timeStamp: serverTimestamp(),
    }).then((currDoc) => {
      if (imageToPost) {
        const currentPost = doc(db, "posts", currDoc.id);
        const imageRef = ref(
          storage,
          `images/uploads/${imageToPost.name + v4()}`
        );
        uploadBytes(imageRef, imageToPost).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updateDoc(currentPost, { image: url });
          });
        });
      }
    });
  };

  const addImageToPost = async (e) => {
    // TODO: need to handle another attribute for reader type so image can get displayed
    alert("addImageToPost on changexs");
    const reader = new FileReader();
    console.log("reader", reader);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-5 p-4 items-center">
        {/* TODO can add check to make sure Image exist */}
        <Image
          className="rounded-full"
          src={session ? session.user.image : "https://links.papareact.com/5me"} //TODO a little bit of a hack for now to get the image
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1 space-x-3">
          <input
            type="text"
            placeholder="Whats on your mind"
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
          ></input>
          <button type="submit" onClick={sendPost}>
            Submit
          </button>
          {imageToPost && (
            <div
              className="flex rounded flex-col items-center filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
              onClick={removeImage}
            >
              <img
                src={imageToPost}
                className="object-contain h-10"
                width={40}
                height={40}
              />
              <p className="text-xs text-red-300">Remove</p>
            </div>
          )}
        </form>
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            type="file"
            ref={filePickerRef}
            onChange={(e) => {
              // sendPost(e);
              setImageToPost(e.target.files[0]);
              // addImageToPost(e); //TODO this is for file readers
            }}
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}
