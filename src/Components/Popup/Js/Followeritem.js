import '../Css/Followeritem.css';
import { ref, getDownloadURL } from "firebase/storage";
import { fire, storage } from '../../firebase.js';
import { useEffect, useState } from 'react';
import default_img from '../../Image/empty_profile.jpg';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

function FollowerItem({data, userInfo, setFollowData, setUserInfo}){

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let [profile, setProfile] = useState('');
  useEffect(()=>{
    getProfile();
  },[])

  const getProfile = () => {
      const storageRef = ref(storage, `userProfile/${data.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
    });
  }

  const unFollow = async() =>{
    if(!userInfo)
      return;

    try{
      const docRef = doc(fire, 'userList', userInfo.email);
      let updateData = null;

      const unFollower = userInfo.follower.filter(_follower => _follower.email !== data.email);
      updateData = {
        ...userInfo,
        "follower":unFollower
      };

      await updateDoc(docRef,updateData);
      setFollowData(updateData.follower);
      setUserInfo(updateData);
      await updateFollowing();
    }
    catch(err){
      console.log(err);
    }
  }

  const updateFollowing = async() => {
    if(!userInfo)
      return;

    try {
      const docRef = doc(fire, 'userList', data.email);
      const snapshot = await getDoc(docRef);
      let user = null;
      if(snapshot.exists())
        user = snapshot.data();

      let updateData = null;

      const unFollower = user.follow.filter(_follower => _follower.email !== userInfo.email);
      updateData = {
        ...user,
        "follow":unFollower
      };

      await updateDoc(docRef,updateData);
    } catch (error) {
      
    }
  }

  return (
    <div className='follow-item'>
      <div>
        <div className='follow-item-main'>
          <div className='follow-item-profile'>
            <img onError={onErrorImg} src={profile}/>
          </div>
          <div className='follow-item-info'>
            <div className="follow-item-nickname">{data.nickname}</div>
            <div className="follow-item-name">{data.name}</div>
            <div className="follow-item-ex">회원님을 팔로우합니다</div>
          </div>
          <div className='follow-item-button'>
            <div onClick={()=>{unFollow();}}>
              삭제
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowerItem;