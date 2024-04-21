import { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {

  let navigate = useNavigate();

  const [isHover, SetHover] = useState([false, false, false, false, false])

  const onMouseOver = (index) => {
    let copy = [...isHover];
    copy[index] = true;
    SetHover(copy);
  }

  const onMouseOut = (index) => {
    let copy = [...isHover];
    copy[index] = false;
    SetHover(copy);
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
            <div onClick={()=>{navigate('/main')}} className={`body-item ${isHover[0] == true ? 'l-body-item-hover' : ''}`} onMouseOver={()=>{onMouseOver(0)}} onMouseOut={()=>{onMouseOut(0)}}>
              <div className={`img home ${isHover[0] == true ? 'img-hover' : ''}`}></div>
              <span>
                홈
              </span>
            </div>
            <div className={`body-item ${isHover[1] == true ? 'l-body-item-hover' : ''}`} onMouseOver={()=>{onMouseOver(1)}} onMouseOut={()=>{onMouseOut(1)}}>
              <div className={`img search ${isHover[1] == true ? 'img-hover' : ''}`}></div>
              <span>
                검색
              </span>
            </div>
            <div className={`body-item ${isHover[2] == true ? 'l-body-item-hover' : ''}`} onMouseOver={()=>{onMouseOver(2)}} onMouseOut={()=>{onMouseOut(2)}}>
              <div className={`img create ${isHover[2] == true ? 'img-hover' : ''}`}></div>
              <span>
                만들기
              </span>
            </div>
            <div className={`body-item ${isHover[3] == true ? 'l-body-item-hover' : ''}`} onMouseOver={()=>{onMouseOver(3)}} onMouseOut={()=>{onMouseOut(3)}}>
            <div className={`img search ${isHover[3] == true ? 'img-hover' : ''}`}></div>
              <span>
                프로필
              </span>
            </div>
          </div>
          <div className='l-footer'>
            <div className={`body-item ${isHover[4] == true ? 'l-body-item-hover' : ''}`} onMouseOver={()=>{onMouseOver(4)}} onMouseOut={()=>{onMouseOut(4)}}>
              <div className={`img more ${isHover[4] == true ? 'img-hover' : ''}`}></div>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                    </li><li className='main-to-list'>
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
                  <div className='profile_Btn'>
                    전환
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
                isHover.map((i)=>{
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