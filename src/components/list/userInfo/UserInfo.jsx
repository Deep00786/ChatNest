import { signOut } from "firebase/auth"
import { useUserStore } from "../../../lib/userStore"
import "./userInfo.css"
import { auth } from "../../../lib/firebase"

const UserInfo = () => {

  const{currentUser,setCurrentUser} = useUserStore()


  return (
    <div className='userinfo'>
        <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h3>{currentUser.username}</h3>
        </div>
        <div className="icons">
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}

export default UserInfo

