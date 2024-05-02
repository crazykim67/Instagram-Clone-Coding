import '../Css/MyProfile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { storage } from '../../firebase.js';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
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
        console.log(url);
      })
    }
  });

  // TODO: 게시물 만들기 팝업 열기/닫기 State
  const [create, setCreate] = useState(false);
  // TODO: 게시물 만들기 Index
  const [index, setIndex] = useState(0);
  // TODO: 게시물 상세보기
  const [post, setPost] = useState(false);
  
  return(
    <>
    {/* <Post/> */}
    {
      create == true ? <Create index={index} setIndex={setIndex} setCreate={setCreate} profile={profile}/> : null
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
                        닉네임
                      </span>
                      <div className='profile-change'>
                        <span>
                          프로필 편집
                        </span>
                      </div>
                    </div>
                    
                    <ul className='follow-ul'>
                      <li>게시물 0</li>
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

                <div className='profile-body'>
                  <div className='content-images'>

                    <div className='c-image'>
                      <img alt='이미지' src={require('../../Image/my.jpg')}/>
                    </div>
                    <div className='c-image'>
                      <img alt='이미지' src={require('../../Image/my.jpg')}/>
                    </div>
                    <div className='c-image last'>
                      <img alt='이미지' src={require('../../Image/my.jpg')}/>
                    </div>

                  </div>

                </div>
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