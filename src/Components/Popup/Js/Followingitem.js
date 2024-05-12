import '../Css/Followingitem.css';
import { ref, getDownloadURL } from "firebase/storage";
import { fire, storage } from '../../firebase.js';
import { useEffect, useState } from 'react';
import default_img from '../../Image/empty_profile.jpg';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

function FollowingItem({data, userInfo, setFollowData, setUserInfo}){

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

  const unFollow = async() => {
    if(!userInfo)
      return;

    try{
      const docRef = doc(fire, 'userList', userInfo.email);
      let updateData = null;

      const unFollow = userInfo.follow.filter(_follower => _follower.email !== data.email);
      updateData = {
        ...userInfo,
        "follow":unFollow
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

      const unFollower = user.follower.filter(_follower => _follower.email !== userInfo.email);
      updateData = {
        ...user,
        "follower":unFollower
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
          </div>
          <div className='follow-item-button'>
            <div onClick={()=>{unFollow();}}>
              팔로잉
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowingItem;