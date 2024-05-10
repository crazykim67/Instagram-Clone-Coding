import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase.js';
import default_img from '../../Image/empty_profile.jpg';

function Recommend({friendData, setFollow}){

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let [profile, setProfile] = useState('');
  // TODO: 데이터 변경 감지 시 프로필 설정
  useEffect(()=> {
    if(friendData){
      const storageRef = ref(storage, `userProfile/${friendData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
      setIsFollow(false);
    }
  }, [friendData]);

  let [isFollow, setIsFollow] = useState(false);

  return(
    <div className='profile'>
      <div>
        <div className='profile-img'>
          <a>
            <img onError={onErrorImg} src={profile}/>
          </a>
        </div>
        <div className='user-info'>
          <div>
            {friendData ? friendData.nickname : '닉네임'}
          </div>
          <span>
            {friendData ? friendData.name : '이름'}
          </span>
        </div>
        <div className='profile_Btn' onClick={()=>{
          setIsFollow(isFollow => !isFollow)
          setFollow(friendData, isFollow); 
        }}>
          { !isFollow ? '팔로우' : '팔로잉'}
        </div>
      </div>
    </div>
  )
}

export default Recommend;