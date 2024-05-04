import '../Css/MyProfile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fire, storage } from '../../firebase.js';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import Post from './Post.js';
import Create from './Create.js';

function MyProfile() {

  let navigate = useNavigate();
  let userData = useSelector((state) => state.currentUser );
  let [profile, setProfile] = useState('');
  useEffect(()=> {
    if(userData.email != ''){
      const storageRef = ref(storage, `userProfile/${userData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  }, [userData.email]);

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
      doc(fire, 'postData', userData.email), (snapshot) => {
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
  },[docData])

  const setItem = (index) => {
    let item = null;
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
        <div onClick={()=>{setPost(true); setPostData(docData[index]);}} key={index} className='c-image'>
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

  

  return(
    <>
    {
      post && <Post post={post} setPost={setPost} postData = {postData}/>
    }
    {
      create && <Create index={index} setIndex={setIndex} setCreate={setCreate} profile={profile}/>
    }
    <div className='MainPanel'>
      <div className='leftPanel'>
            <div className='l-top'>
              <span onClick={()=>{navigate('/main')}}>Pilstagram</span>
            </div>
            <div className='l-body'>
              <div onClick={()=>{navigate('/main')}} className={`body-item`}>
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
              <div className={`body-item`} onClick={()=> {navigate('/profile')}}>
              <div className={`img my-profile`} style={{backgroundImage:`url(${profile})`}}></div>
                <span>
                  프로필
                </span>
              </div>
            </div>
            <div className='l-footer'>
              <div className={`body-item`}>
                <div className={`img more`}></div>
                <span>
                  더 보기
                </span>
              </div>
            </div>
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
                        <img src={profile}/>
                      </div>
                    </div>
                  </div>

                  <div className='profile-content'>

                    <div>
                      <span className='profile-content-nick'>
                        {userData.nickname}
                      </span>
                      <div className='profile-change'>
                        <span>
                          프로필 편집
                        </span>
                      </div>
                    </div>
                    
                    <ul className='follow-ul'>
                      <li>게시물 {postSize}</li>
                      <li>팔로워 0</li>
                      <li>팔로우 0</li>
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
                {/* <div className='profile-body'>
                  <div className='content-images'>

                    <div className='c-image'>
                      <img alt='이미지' src={require('../../Image/my.jpg')}/>
                    </div>
                    <div className='c-image'>
                      <img alt='이미지' src={require('../../Image/my.jpg')}/>
                    </div>
                    <div className='c-video'>
                      <video controls={false} autoPlay={false} loop={false} preload={'auto'}>
                        <source src={require('../../videos/video.mp4')}/>
                      </video>
                    </div>

                  </div>
                </div> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyProfile