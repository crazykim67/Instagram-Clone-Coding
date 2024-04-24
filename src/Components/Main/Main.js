import { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import { signOut, firebaseAuth } from '../firebase.js';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player';

function Main() {

  let navigate = useNavigate();
  const [dummy] = useState([false,false,false]);

  const onSignOut = async () => {
    await signOut(firebaseAuth)
    .then(()=>{
      alert('로그아웃되었습니다. 로그인 후 이용해주세요.');
      navigate('/Instagram/');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  let userData = useSelector((state) => state.currentUser );
  // TODO: userSlice로 요청보내주는 함수
  let dispatch = useDispatch();
  return (
    <>
      <div className='MainPanel'>
        {
          // TODO: left Menu
        }
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
            <div className={`body-item`}>
              <div className={`img search`}></div>
              <span>
                검색
              </span>
            </div>
            <div className={`body-item`}>
              <div className={`img create`}></div>
              <span>
                만들기
              </span>
            </div>
            <div className={`body-item`}>
            <div className={`img search`}></div>
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
                              <img src={require('../Image/my.jpg')}/>
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
                              <img src={require('../Image/my.jpg')}/>
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
                              <img src={require('../Image/my.jpg')}/>
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
                    <div className='post-panel'>
                      <div className='post-top'>
                        <div>
                          <div className='post-top-profile'>

                            <div>
                              <span>
                                <img src={require('../Image/my.jpg')}/>
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
                                <div className='img-list'>

                                  <ul>
                                    <li style={{transform: "translateX(0px)"}}>
                                      <video className='post-video' controls={false} autoPlay preload='auto'>
                                        <source src={require('../videos/video.mp4')}/>
                                      </video>
                                      <div className='volumeBtn'>
                                        <img src={require('../Image/volume.png')}/>
                                      </div>
                                    </li>
                                    <li style={{transform: "translateX(468px)"}}>
                                      <img className='post-img' alt='이미지' src={require('../Image/my.jpg')}/>
                                    </li>
                                    <li style={{transform: "translateX(936px)"}}>
                                      <img className='post-img' alt='이미지' src={require('../Image/my.jpg')}/>
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
                              <img className='footer-content-img' src={require('../Image/un_like.png')}/>
                            </span>
                            <span className='comment'>
                              <img className='footer-content-img' src={require('../Image/bubble.png')}/>
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
                          <div className='post-write-more'>
                            ...
                            <span>&nbsp;더 보기</span>
                          </div>
                        </div>
                        <div className='post-write-comment'>
                            댓글 0개 보기
                        </div>
                      </div>

                    </div>
                    
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
                      <img src={require('../Image/empty_profile.jpg')}/>
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
            <div className='recommend-panel'>
              <div className='for-recommend'>
                회원님을 위한 추천
              </div>
            </div>

            <div className='re-user-list'>
              {
                dummy.map((item, i)=>{
                  return(
                <div key={i} className='profile'>
                  <div>
                    <div className='profile-img'>
                      <a>
                        <img src={require('../Image/empty_profile.jpg')}/>
                      </a>
                    </div>
                    <div className='user-info'>
                      <div>
                        아이디
                      </div>
                      <span>
                        닉네임
                      </span>
                    </div>
                    <div className='profile_Btn'>
                      팔로우
                    </div>
                  </div>
                </div>
                  )
                })
              }
            
              
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Main