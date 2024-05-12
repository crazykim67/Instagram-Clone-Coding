import '../Css/SearchItem.css';
import { storage } from '../../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import default_img from '../../Image/empty_profile.jpg';
import { useNavigate } from 'react-router-dom';

function SearchItem({sUserData}){

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let navigate = useNavigate();

  const [profile, setProfile] = useState('');
  useEffect(()=> {
    if(sUserData.email != ''){
      const storageRef = ref(storage, `userProfile/${sUserData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  }, []);

  return (
    <div onClick={()=>{ navigate(`/profile/${sUserData.email}`)}} className='search-item'>
      <div>
        <div className='search-box'>
          <div className='search-item-profile'>
            <img onError={onErrorImg} src={profile}/>
          </div>
          <div className='search-item-info'>
            <span className='search-info-nick'>{sUserData ? sUserData.nickname : "닉네임"}</span>
            <span className='search-info-name'>{sUserData ? sUserData.name : "이름"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem;