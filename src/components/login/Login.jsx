import React,{useState, useEffect} from "react";
import "./login.css";
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload.js";


const Login = () => {
    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    });

    const [loading,setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);


    const handleAvatar = (e) =>{
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        });
     }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target);

        const {username,email,password} = Object.fromEntries(formData);
      
        try{

         const res= await createUserWithEmailAndPassword(auth,email,password);

         const imgUrl = await upload(avatar.file)

         await setDoc(doc(db, "users", res.user.uid), {
           username,
           email,
           avatar:imgUrl,
           id:res.user.uid,
           blocked:[],
          });

          await setDoc(doc(db, "userchats", res.user.uid),{
            chats:[],
          });

          toast.success("Account created! You can login now!");
          setShowLogin(true);
        }catch(err){
            console.log(err)
            toast.error(err.message)
        } finally{
            setLoading(false);
        }
       };

       const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const {email,password} = Object.fromEntries(formData);

        try{
            await signInWithEmailAndPassword(auth,email,password)
            toast.success("Logged in!");
        }catch(err){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
      
       };


  return (
      <div className='login'>
<div className={`item ${showLogin ? "" : "hide-on-mobile"}`}>
  <h2>Welcome back,</h2>
  <form onSubmit={handleLogin}>
    <input type="text" placeholder="Email" name="email" />
    <input type="password" placeholder="Password" name="password" />
    <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
  </form>
  {isMobile && (
    <p className="toggle-link" onClick={() => setShowLogin(false)}>
      Don't have an account? <span>Hide, Sign In</span>
    </p>
 )}
</div>

 <div className="separate"></div>

    <div className={`item ${showLogin ? "hide-on-mobile" : ""}`}>  
        <h2>Create an Account</h2>
    <form onSubmit={handleRegister}>
        <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image</label>
    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
    <input type="text" placeholder="Username" name="username" />
     <input type="text" placeholder="Email" name="email" />
     <input type="password" placeholder="Password" name="password" />
     <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
        <p className="toggle-link" onClick={() => setShowLogin(true)}>
            Already have an account? <span>Sign In</span>
        </p>
    </div>
     
  </div>
  );
};

export default Login