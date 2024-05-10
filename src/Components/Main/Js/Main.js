import { memo, useEffect, useState } from 'react';
import '../Css/Main.css';
import { useNavigate } from 'react-router-dom';
import { signOut, firebaseAuth, fire, storage } from '../../firebase.js';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import Create from './Create.js';
import default_img from '../../Image/empty_profile.jpg';
import Recommend from './Recommend.js';
import { query } from 'firebase/database';
import SearchItem from './SearchItem.js';

function Main() {

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let navigate = useNavigate();

  const onSignOut = async () => {
    try{
      await signOut(firebaseAuth)
      alert('로그아웃되었습니다. 로그인 후 이용해주세요.');
      navigate('/Instagram/');
    }
    catch(err){
      console.log(err);
    }
  }

  let userData = useSelector((state) => state.currentUser );
  
  // TODO: 로그인 후 프로필 이미지 설정
  const [profile, setProfile] = useState('');
  useEffect(()=> {
    if(userData.email != ''){
      const storageRef = ref(storage, `userProfile/${userData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  });

  // TODO: 게시물 만들기 팝업 열기/닫기 State
  let [create, setCreate] = useState(false);
  // TODO: 게시물 만들기 Index
  let [index, setIndex] = useState(0);

  let [search, setSearch] = useState(false);

  return (
    <>
      {/* <Post/> */}
      {
        create == true ? <Create index={index} setIndex={setIndex} setCreate={setCreate} profile={profile}/> : null
      }
      <div className='MainPanel'>
        {
          // TODO: left Menu
        }
        <div className='leftPanel' style={{width: `${!search ? 240 : 72}px`, transition:`width 0.2s ease-in-out`}}>
          <div className='l-top'>

            {
              search === false ? <span onClick={()=>{navigate('/main')}}>Pilstagram</span> : <span onClick={()=>{navigate('/main')}}><img src={require('../../Image/instaLogo.png')}/></span>
            }
            
          </div>
          <div className='l-body'>
            <div onClick={()=>{}} className={`body-item`}>
              <div className={`img home`}></div>
              {
                !search && <span>홈</span>
              }
              
            </div>
            <div className={`body-item`} onClick={()=>{
              setCreate(true);
            }}>
              <div className={`img create`}></div>
              {
                !search && <span>만들기</span>
              }
            </div>
            <div onClick={()=>{setSearch(search => !search)}} className={`body-item`}>
              <div className={`img search`}></div>
              {
                !search && <span>검색</span>
              }
            </div>
            <div className={`body-item`} onClick={()=> {navigate('/profile')}}>
            <div className={`img my-profile`} style={{backgroundImage:`url(${profile})`}}></div>
              {
                !search && <span>프로필</span>
              }
            </div>
          </div>
          <div className='l-footer'>
            <div className={`body-item`}>
              <div className={`img more`}></div>
              {
                !search &&<span>더 보기</span>
              }
            </div>
          </div>
        </div>
        <div className='searchPanel' style={{transform: `translateX(${!search ? -470 : 0}px)`, transition:`transform 0.3s ease-in-out`}}>
          <div>
            <div className='search-display'>
              <div className='search-top'>
                <span>검색</span>
              </div>
              <div className='search-body'>
                <div className='search-input'>
                  <input placeholder='검색' type='text'/>
                  <div className='search-remove'></div>
                </div>
                <div className='search-hr'></div>
                <div className='search-result-panel'>
                  <div>
                    <div className='search-result-top'>
                      <span>검색 항목</span>
                    </div>
                    <div className='search-result-main'>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='MainContent'>
          <div className='main-content'>
            <div>
              <div className='main-top'>
                <div>
                  <ul>

                  <li className='main-to-list'>
                      <div>
                        <div className='list-in-panel'>
                          <div className='list-profile'>
                            <span>
                              <img onError={onErrorImg} src={profile}/>
                            </span>
                          </div>
                          <div className='list-nickname'>
                            내 스토리
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='main-to-list'>
                      <div>
                        <div className='list-in-panel on-story'>
                          <div className='list-profile'>
                            <span className='story-wrap'>
                              <img src={require('../../Image/my.jpg')}/>
                            </span>
                          </div>
                          <div className='list-nickname'>
                            닉네임
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='main-to-list'>
                      <div>
                        <div className='list-in-panel on-story'>
                          <div className='list-profile'>
                            <span className='none-story-wrap'>
                              <img src={require('../../Image/my.jpg')}/>
                            </span>
                          </div>
                          <div className='list-nickname'>
                            닉네임
                          </div>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>

              <div className='main-body'>
                <div className='main-body-content'>
                  <div>
                  {
                    // TODO: 게시물 List
                  }
                    <section className='post-panel'>
                      <div className='post-top'>
                        <div>
                          <div className='post-top-profile'>

                            <div>
                              <span>
                                <img src={require('../../Image/my.jpg')}/>
                              </span>
                            </div>

                          </div>

                          <div className='post-top-info'>
                            <div className='post-top-info-nick'>
                              <div className='info-nick'>닉네임</div>
                              <span>●</span>
                              <div className='info-date'>1시간</div>
                            </div>
                            <div className='info-type'>
                              <span>
                                원본 오디오
                              </span>
                            </div>
                          </div>

                          <div className='post-top-more'>
                            <div>
                              <span>
                                ●●●
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className='post-body'>

                          <div style={{width: '468px'}}>
                            <div className='post-pic-content'>
                                <div className={`img-list`}>

                                  <ul>
                                    <li style={{transform: "translateX(0px)"}}>
                                      {/* <video className='post-video' controls={false} autoPlay={true} loop={true} preload={'auto'}>
                                        <source src={require('../../videos/video.mp4')}/>
                                      </video>
                                      <div className='volumeBtn'>
                                        <img src={require('../../Image/volume.png')}/>
                                      </div> */}
                                      <img className='post-img' alt='이미지' src={require('../../Image/my.jpg')}/>
                                    </li>
                                    <li style={{transform: "translateX(468px)"}}>
                                      <img className='post-img' alt='이미지' src={require('../../Image/my.jpg')}/>
                                    </li>
                                    <li style={{transform: "translateX(936px)"}}>
                                      <img className='post-img' alt='이미지' src={require('../../Image/my.jpg')}/>
                                    </li>
                                  </ul>
                                  {
                                    <button className='prev postBtn'>
                                      <div>
                                        <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                                      </div>
                                    </button>
                                  }
                                  {
                                    <button className='next postBtn'>
                                      <div>
                                        <FontAwesomeIcon icon={faCircleChevronRight} size="xl" />
                                      </div>
                                    </button>
                                  }
                                  
                                  
                                </div>
                              
                            </div>
                          </div>

                      </div>

                      <div className='post-footer'>
                        <div className='footer-content'>
                          <div>
                            <span className='like'>
                              <img className='footer-content-img' src={require('../../Image/un_like.png')}/>
                            </span>
                            <span className='comment'>
                              <img className='footer-content-img' src={require('../../Image/bubble.png')}/>
                            </span>
                          </div>
                        </div>
                        <div className='footer-like'>
                          좋아요 0개
                        </div>
                        <div className='post-write'>
                          <span className='post-write-nick'>
                            닉네임
                          </span>
                          <div className='post-writing'>
                            <span>
                              게시물 글
                            </span>
                          </div>
                        </div>
                        <div className='post-write-comment'>
                            댓글 0개 보기
                        </div>
                      </div>

                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='rightPanel'>
            <div>
              <div className='profile'>
                <div>
                  <div className='profile-img'>
                    <a>
                      <img onError={onErrorImg} src={profile}/>
                    </a>
                  </div>
                  <div className='user-info'>
                    <div>
                      {userData.nickname}
                    </div>
                    <span>
                      {userData.name}
                    </span>
                  </div>
                  <div onClick={()=>{onSignOut();}} className='profile_Btn'>
                    로그아웃
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Main);