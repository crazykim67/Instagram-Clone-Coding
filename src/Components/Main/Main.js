import { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import { db, signOut, firebaseAuth, createUserWithEmailAndPassword } from '../firebase.js';

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
                        <div className='list-in-panel'>
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
                      아이디
                    </div>
                    <span>
                      닉네임
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
                dummy.map((i)=>{
                  return(
                <div className='profile'>
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