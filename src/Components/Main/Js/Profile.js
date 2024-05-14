import '../Css/Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fire, storage } from '../../firebase.js';
import { useEffect, useRef, useState } from 'react';
import { ref, getDownloadURL, updateMetadata, uploadBytes } from "firebase/storage";
import { doc, updateDoc, onSnapshot, deleteField, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import Post from './Post.js';
import Create from './Create.js';
import default_img from '../../Image/empty_profile.jpg';
import { useParams } from 'react-router-dom';
import FollowerPopup from '../../Popup/Js/FollowerPopup.js';
import FollowingPopup from '../../Popup/Js/FollowingPopup.js';

function Profile() {

  let { curUserEmail } = useParams();

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let navigate = useNavigate();
  let userData = useSelector((state) => state.currentUser );

  let [myProfile, setMyProfile] = useState('');

  let [profile, setProfile] = useState('');
  useEffect(()=> {
    if(curUserEmail != ''){
      if(curUserEmail !== userData.email)
        getProfile(false);
      else
        getProfile(true);
    }
    setUserInfo();
    setDocData();
    setMediaData();
  }, [curUserEmail]);

  const getProfile = (isMine) => {
    if(isMine){
      const storageRef = ref(storage, `userProfile/${curUserEmail}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
        setMyProfile(url);
      })
    }
    else {
      const storageRef = ref(storage, `userProfile/${curUserEmail}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
      const myRef = ref(storage, `userProfile/${userData.email}.jpg`)
      getDownloadURL(myRef)
      .then((url)=>{
        setMyProfile(url);
      })
    }
  }

  // TODO: 게시물 만들기 팝업 열기/닫기 State
  const [create, setCreate] = useState(false);
  // TODO: 게시물 만들기 Index
  const [index, setIndex] = useState(0);

  // TODO: 게시물 수
  let [postSize, setSize] = useState(0);
  // TODO: 게시물 열 수
  let [rowSize, setRow] = useState(0);
  let [docData, setDocData] = useState();

  // TODO: 게시물 상세보기
  const [post, setPost] = useState(false);
  // TODO: 미디어 정보
  let [mediaDocData, setMediaData] = useState();
  // TODO: 게시물 데이터
  let [postData, setPostData] = useState(null);
  
  // TODO: 게시물 데이터 불러오기
  const getPostDoc = () => {
    onSnapshot(
      doc(fire, 'postData', curUserEmail), (snapshot) => {
        const refData = snapshot.data();
        if(refData){
          const dataValues = Object.values(refData);

          // TODO: DATE 내림차순
          dataValues.sort((a, b)=>{
            if(a[0].date > b[0].date) return -1;
            if(a[0].date < b[0].date) return 1;
            return 0;
          })
          let values = [];
          let media = [];
          for(let i = 0; i < dataValues.length; i++){
            values.push(dataValues[i][0]);
            media.push(dataValues[i][0].media[0]);
          }

          if(!docData || (docData && docData.length != values.length))
          setDocData(values);
          setMediaData(media);
          // TODO: 행열 설정
          setSize(dataValues.length);
          setRow(Math.ceil(postSize / 3));
        } 
      }
    )
  }
  
  useEffect(()=>{
    getPostDoc();
  },[docData, curUserEmail])

  const setItem = (index) => {
    let item = null;

    if(!mediaDocData)
      return;

    switch(mediaDocData[index]?.type){
      case 'image':{
        item = 
        <div onClick={()=>{setPost(true); setPostData(docData[index]);}} key={index} className='c-image'>
          <img alt='이미지' src={mediaDocData[index]?.url}/>
        </div>
      break;
      }
      case 'video':{
        item = 
        <div onClick={()=>{setPost(true); setPostData(docData[index]);}} key={index} className='c-video' >
          <video controls={false} autoPlay={false} loop={false} preload={'auto'}>
            <source src={mediaDocData[index]?.url}/>
          </video> 
        </div>
        break;
      }
      default:{
        item = 
        <div key={index} className='c-image'>
        </div>
      }
    }
    return item;
  }

  const contentRow = () => {
    let posts = [];
    // TODO: 행
    for(let i = 0; i < rowSize; i++){
      let columnItem = [];
      // TODO: 열
      for(let j = 0; j < 3; j++){
        const index = i * 3 + j;
          columnItem.push(
            setItem(index)
          )
      }

      posts.push(
        <div key={i} className='profile-body'>
          <div className='content-images'>
            {columnItem}
          </div>
        </div>
      );
    }

    return posts;
  }

  // TODO: 게시물 삭제
  const deletePost = async () => {
    if(postData){
      const postUuid = postData.uuid;
      const docRef = doc(fire, `postData`, userData.email);

      const updateData = {};
      updateData[postUuid] = deleteField(); // 동적 속성 이름 설정
      await updateDoc(docRef, updateData);
    }
  }

  // TODO: 유저 정보 가져오기
  let [userInfo, setUserInfo] = useState();
  useEffect(()=>{
    if(!userInfo)
    getUserInfo();
  },[userInfo])

  const getUserInfo = async () => {
    const docRef = doc(fire, `userList`, curUserEmail);
    const snapshot = await getDoc(docRef);
    let userFollowInfo = null;
    if(snapshot.exists()){
      userFollowInfo = snapshot.data();
    }
    setUserInfo(userFollowInfo);
  }

  useEffect(()=>{
    getFollowing();
  }, [userInfo])

  let [follow, setFollow] = useState(false);

  // TODO: 내가 팔로우한 사람
  const getFollowing = () => {
    if(!userInfo || curUserEmail === userData.email)
      return;
    // 해당 유저 데이터에 내 이름이 포함되어있는지 확인
    const followingData = userInfo.follower;
    const isFollowing = followingData.some(_following => _following.email === userData.email);
    setFollow(!isFollowing);
  }

  // TODO: 팔로잉
  const setFollower = async () => {
    if(!userInfo)
      return;

    try {
  
      const followingData = userInfo.follower;
      let isFollowing = followingData.some(_follow => _follow.email === userData.email);
  
      // TODO: 해당 유저 Document
      const docRef = doc(fire, 'userList', userInfo.email);
      let updateData = null;
  
      // 팔로잉 안되어있음
      if(!isFollowing){
        updateData = {
          ...userInfo,
          "follower":[{"email":userData.email, "nickname":userData.nickname, "name":userData.name}, ...userInfo.follower]
        };
      }
      // 팔로잉 되어있음
      else {
        const unFollower = userInfo.follower.filter(_follower => _follower.email !== userData.email);
        updateData = {
          ...userInfo,
          "follower":unFollower
        };
      }
      await updateDoc(docRef,updateData);
      setUserInfo(updateData);
      await updateMyFollowing();
    } catch (error) {
      console.log(error);
    }
  }

  const updateMyFollowing = async() => {
    if(!userInfo)
      return;

    try {
      const followingData = userInfo.follower;
      let isFollowing = followingData.some(_follow => _follow.email === userData.email);

      // TODO: 내 정보 Document
      const docRef = doc(fire, 'userList', userData.email);
      const snapshot = await getDoc(docRef);
      let myUserData = null;

      if(snapshot.exists())
        myUserData = snapshot.data();
      
      let updateData = null;

      // 팔로잉 안되어있음
      if(!isFollowing){
        updateData = {
          ...myUserData,
          "follow":[{"email":userInfo.email, "nickname":userInfo.nickname, "name":userInfo.name}, ...myUserData.follow]
        }
      }
      // 팔로잉 되어있음
      else {
        const unFollowing = myUserData.follow.filter(_follow => _follow.email !== userInfo.email)
        updateData = {
          ...myUserData,
          "follow":unFollowing
        };
      }
      await updateDoc(docRef,updateData);
    } catch (error) {
      console.log(error);
    }
    
  }

  // TODO: 팔로워 리스트
  let [followerList, setFollowerList] = useState(false);
  // TODO: 팔로잉 리스트
  let[followingList, setFollowingList] = useState(false);

  const inputRef = useRef();
  const onHandlerInput = () => {
    inputRef.current?.click();
  }

  const [file, setFile] = useState([]);

  useEffect(()=>{
    if(file[0]){
      updateProfile(file[0]);
    }
    
  }, [file])
  const updateProfile = async (_file) => {
    const metaData = { contentType: 'image/jpeg' };

    const fileRef = ref(storage, `userProfile/${userData.email}.jpg`);
    await updateMetadata(fileRef, metaData);
    await uploadBytes(fileRef, _file)
    .then(()=>{
      if(curUserEmail != ''){
        if(curUserEmail !== userData.email)
          getProfile(false);
        else
          getProfile(true);
      }
    });
  }

  return(
    <>
    {
      followingList && <FollowingPopup setFollowingList={setFollowingList} following={userInfo.follow} userInfo={userInfo} setUserInfo={setUserInfo}/>
    }
    {
      followerList && <FollowerPopup setFollowerList={setFollowerList} follower={userInfo.follower} userInfo={userInfo} setUserInfo={setUserInfo}/>
    }
    {
      post && <Post post={post} setPost={setPost} postData = {postData} setPostData={setPostData} deletePost={deletePost}/>
    }
    {
      create && <Create index={index} setIndex={setIndex} setCreate={setCreate} profile={profile}/>
    }
    <div className='MainPanel'>
      <div className='leftPanel' style={{width: '240px'}}>
            <div className='l-top'>
              <span onClick={()=>{navigate('/main');}}>Pilstagram</span>
            </div>
            <div className='l-body'>
              <div onClick={()=>{navigate('/main');}} className={`body-item`}>
                <div className={`img home`}></div>
                <span>
                  홈
                </span>
              </div>
              <div className={`body-item`} onClick={()=>{
              setCreate(true);
            }}>
                <div className={`img create`}></div>
                <span>
                  만들기
                </span>
              </div>
              <div className={`body-item`} onClick={()=> {navigate(`/profile/${userData.email}`);}}>
              <div className={`img my-profile`} style={{backgroundImage:`url(${myProfile})`}}></div>
                <span>
                  프로필
                </span>
              </div>
            </div>
            {/* <div className='l-footer'>
              <div className={`body-item`}>
                <div className={`img more`}></div>
                <span>
                  더 보기
                </span>
              </div>
            </div> */}
      </div>
      <div className='profile-panel'>
        <div>
          <div className='profile-main'>
            <main>
              <div>

                <div className='profile-header'>

                  <div className='profile-img-area'>
                    <div>
                      <div>
                        <img onError={onErrorImg} src={profile}/>
                      </div>
                    </div>
                  </div>

                  <div className='profile-content'>

                    <div>
                      <span className='profile-content-nick'>
                        {userInfo ? userInfo.nickname : ""}
                      </span>
                      { 
                        curUserEmail !== userData.email &&
                        <>
                          {
                            !follow ? <div className='followBtn un' onClick={()=> {setFollower();}}><span>팔로잉</span></div>
                            : <div className='followBtn' onClick={()=> {setFollower();}}><span>팔로우</span></div>
                          }
                        </>
                      }
                      
                      {
                        curUserEmail === userData.email &&
                        <div className='profile-change'>
                        <span onClick={()=>{onHandlerInput();}}>
                          프로필 편집
                        </span>
                        <input type='file' accept='.jpg, .jpeg' style={{display:'none'}} ref={inputRef} onChange={(e)=>{
                          setFile(Array.from(e.target.files));
                        }}/>
                      </div>
                      }
                      
                    </div>
                    
                    <ul className='follow-ul'>
                      <li>게시물 {postSize}</li>
                      {
                        userData.email === curUserEmail ? 
                        <><li style={{cursor:'pointer'}} onClick={()=>{setFollowerList(followerList => !followerList)}}>팔로워 { userInfo ? userInfo.follower.length : 0}</li>
                        <li style={{cursor:'pointer'}} onClick={()=>{setFollowingList(followingList => !followingList)}}>팔로잉 { userInfo ? userInfo.follow.length : 0}</li></>
                        : <><li>팔로워 { userInfo ? userInfo.follower.length : 0}</li><li>팔로잉 { userInfo ? userInfo.follow.length : 0}</li></>
                      }
                      
                    </ul>
                  </div>

                </div>

                <div className='profile-nav'>
                  <a>
                    <span><FontAwesomeIcon icon={faTableCells} /></span>
                    게시물
                  </a>
                </div>
                {contentRow()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile