import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

function Post(){
  return(
    <>
    <div className='dim'></div>
    <div className='postBody'>
      <div className='close'>
        <img alt='Close' src={require('../Image/close.png')}/>
      </div>
      <div className='post-detail-panel'>
          <div className='post-box'>
            <div>
              <div className='post-detail-content'>
                <div className='post-detail-content-div'>
                  {
                    // TODO: Image or Video
                  }
                  <ul>

                    <li className='detail-img-list' style={{transform: "translateX(0px)"}}>
                      <img className='post-detail-img' alt='이미지' src={require('../Image/my.jpg')} />
                    </li>

                    <li className='detail-img-list' style={{transform: "translateX(700px)"}}>
                      <img className='post-detail-img' alt='이미지' src={require('../Image/my.jpg')} />
                    </li>

                  </ul>
                <button className='post-in-Btn prev'>
                  <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                </button>
                <button className='post-in-Btn next'>
                  <FontAwesomeIcon icon={faCircleChevronRight} size="xl" />
                </button>
                </div>
                
              </div>
              <div className='detail-comment'>
                <div>
                  <div className='detail-comment-panel'>

                    <div className='detail-comment-top'>
                      <div>
                        <div className='detail-profile'>
                          <div>
                            <img alt='이미지' src={require('../Image/my.jpg')} />
                          </div>

                          <div className='detail-nick'>
                            <div>
                              <span>닉네임</span>
                              <span style={{fontSize:'10px', alignItems:'center', padding:'0 10px 0 10px'}}>●</span>
                              <button>팔로우</button>
                            </div>
                          </div>

                        </div>
                        
                      </div>
                    </div>

                    <div className='detail-comment-main'>

                    <div className='detail-comments'>

                        <ul>
                          {/* 
                            TODO: 작성자 댓글
                          */}
                          <div className='writer-comment'>
                            <li>
                              <div className='comment-writing'>
                                <div>
                                  <div className='write-profile'>
                                    <img alt='프로필' src={require('../Image/my.jpg')}/>
                                  </div>
                                  <div className='write-comment'>
                                    <h2>닉네임</h2>
                                    <span className='main-text'>
                                    프리온보딩 FE 챌린지로 취업 준비 끝!<br/>
                                    성장 프레임워크: 주니어를 위한 네 가지 질문<br/>
                                    <br/>
                                    ✅참가자격<br/>
                                    커리어 시작을 준비하는 분<br/>
                                    이직을 희망하는 주니어<br/>

                                    📆 5월 2일 모집 마감<br/>

                                    일하는 사람들의 모든 가능성<br/>
                                    </span>
                                    <div className='text-time'>
                                      15시간
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </div>

                          {/* 
                            // TODO: 팔로워 댓글 부분
                          */}
                          <div className='follower-comment-area'>
                              <ul>
                                <div className='follower-comment'>
                                  <li>
                                    <div className='comment-writing'>
                                      <div>
                                        <div className='write-profile'>
                                          <img alt='프로필' src={require('../Image/my.jpg')}/>
                                        </div>

                                        <div className='write-comment'>

                                          <h2>닉네임</h2>
                                          <span className='main-text'>
                                            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                                          </span>
                                          
                                          <div className='text-content'>
                                            <span>41주</span>
                                            <span>답글달기</span>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                    
                                  </li>
                                  <li>
                                    <ul className='reply-panel'>
                                      <li>
                                        <div className='comment-Hide-Show'>
                                          - 답글 숨기기
                                        </div>
                                      </li>
                                        {/*
                                          // TODO: 대댓글
                                        */}
                                          <div className='reply-comment'>
                                            <li>
                                              <div className='comment-writing'>
                                                <div>

                                                  <div className='write-profile'>
                                                    <img alt='프로필' src={require('../Image/my.jpg')}/>
                                                  </div>

                                                  <div className='write-comment'>

                                                    <h2>닉네임</h2>
                                                    <span className='main-text'>
                                                      내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                                                    </span>

                                                    <div className='text-content'>
                                                      <span>41주</span>
                                                      <span>답글달기</span>
                                                    </div>

                                                  </div>

                                                </div>
                                              </div>
                                            </li>
                                          </div>

                                          <div className='reply-comment'>
                                            <li>
                                              <div className='comment-writing'>
                                                <div>

                                                  <div className='write-profile'>
                                                    <img alt='프로필' src={require('../Image/my.jpg')}/>
                                                  </div>

                                                  <div className='write-comment'>

                                                    <h2>닉네임</h2>
                                                    <span className='main-text'>
                                                      내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                                                    </span>

                                                    <div className='text-content'>
                                                      <span>41주</span>
                                                      <span>답글달기</span>
                                                    </div>

                                                  </div>

                                                </div>
                                              </div>
                                            </li>
                                          </div>

                                    </ul>
                                  </li>

                                </div>

                              </ul>
                          </div>

                        </ul>

                      </div>

                      <section className='detail-content'>
                        <span>
                          <img src={require('../Image/un_like.png')}/>
                        </span>
                        <span>
                          <img src={require('../Image/bubble.png')}/>
                        </span>
                      </section>

                      <section className='detail-like'>
                        좋아요 1.2만개
                      </section>

                      <div className='detail-date'>
                        4월 25일
                      </div>

                      <section className='detail-input'>
                        <div>
                          <form methods='POST'>
                            <textarea aria-label='댓글 달기' placeholder='댓글 달기...' autoComplete='off' autoCorrect='off' />
                              <span>
                                게시
                              </span>
                          </form>
                          
                        </div>
                        
                      </section>
                    </div>

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

export default Post;