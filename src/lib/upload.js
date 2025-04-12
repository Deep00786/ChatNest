import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

// const upload = async (file)=>{
// const date = new Date()

const upload = async (file) => {
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  const timestamp = new Date().getTime();

const storageRef = ref(storage, `images/${timestamp}_${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

return new Promise((resolve,reject)=>{

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Uplaod is" + progress + "% done");
  }, 
  (error) => {
    reject("Something went wrong!" +error.code)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     resolve(downloadURL);
    });
  }
);
});
}

export default upload