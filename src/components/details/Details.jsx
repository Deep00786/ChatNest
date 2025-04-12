import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore"
import { auth, db } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore";
import "./details.css"

const Detail = () => {

   const{ chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock} =
    useChatStore();
    const{currentUser}=useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db,"users",currentUser.id)

    try{
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='details'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Grateful for every sunrise and sunset</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Security</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
              <img src="https://images.pexels.com/photos/19400412/pexels-photo-19400412/free-photo-of-a-mountain-with-snow-on-it-and-a-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
              <img src="https://images.pexels.com/photos/19400412/pexels-photo-19400412/free-photo-of-a-mountain-with-snow-on-it-and-a-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
              <img src="https://images.pexels.com/photos/19400412/pexels-photo-19400412/free-photo-of-a-mountain-with-snow-on-it-and-a-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>{
        isCurrentUserBlocked 
        ? "You are blocked" 
        : isReceiverBlocked 
        ? "User blocked" 
        : "Block User" }
        </button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail