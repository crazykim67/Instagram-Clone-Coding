import '../Css/Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fire, storage } from '../../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Post({post, setPost, postData}){

  let [index, setIndex] = useState(0);
  let [currentIndex, setCurIndex] = useState(0);
  let [mediaData, setMedia] = useState();

  let userData = useSelector((state) => state.currentUser );
  let [profile, setProfile] = useState('');
  let [date, setDate] = useState('');

  // TODO: 날짜 포맷
  const dateFormat = (_date) => {
    const timestamp = (_date.seconds * 1000) + Math.round(_date.nanoseconds / 1000000);

    const dateTime = new Date(timestamp);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();

    const formatDate = `${year}년${month}월${day}일`;
    setDate(formatDate);
  }

  // TODO: 데이터 변경 감지 시
  useEffect(()=>{

    if(postData){
      setIndex(postData.media.length);
      setCurIndex(0);
      setMedia(postData.media);

      dateFormat(postData.date);
    }
    

  }, [postData]);

  // TODO: 미디어 데이터 변경 감지 시
  useEffect(()=>{
    if(mediaData)
    console.log(mediaData);
  }, [mediaData])

  // TODO: 데이터 변경 감지 시 프로필 설정
  useEffect(()=> {
    if(userData.email != ''){
      const storageRef = ref(storage, `userProfile/${postData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  }, [postData]);

  const getType = (_media) => {
    let render = null;
    switch(_media.type){
      case 'image':{
        render = 
        <img className='post-detail-img' alt='이미지' src={_media.url} />
        break;
      }
      case 'video':{
        render =
        <video className='post-detail-video' controls={false} autoPlay={true} loop={false} preload={'auto'}>
          <source src={_media.url}/>
        </video>
        break;
      }
    }
    return render;
  }

  const mediaList = () => {
    let list = [];

    for(let i = 0; i < index; i++){
      list.push(
        <li className='detail-img-list' style={{transform: `translateX(${(700*i)+(-700*currentIndex)}px)`, transition:`transform ${0.2}s ease-in-out`}}>
          {
            getType(mediaData[i])
          }
        </li>
      )
    }

    return list;
  }

  return(
    <>
    
    <div className='postBody'>
      <div className='close' onClick={()=>{setPost(false);}}>
        <img alt='Close' src={require('../../Image/close.png')}/>
      </div>
      <div className='post-detail-panel'>
          <div onClick={()=>{setPost(false);}} className='dim'></div>
          <div className='post-box'>
            <div>
              <div className='post-detail-box'>
              <div className='post-detail-content'>
                <div className='post-detail-content-div'>
                  {
                    // TODO: Image or Video
                  }
                  <ul>
                    {mediaList()}
                    {/* <li className='detail-img-list' style={{transform: "translateX(0px)"}}>
                      <video className='post-detail-video' controls={false} autoPlay={false} loop={false} preload={'auto'}>
                        <source src={require('../../videos/video.mp4')}/>
                      </video>
                    </li>

                    <li className='detail-img-list' style={{transform: "translateX(700px)"}}>
                      <img className='post-detail-img' alt='이미지' src={require('../../Image/my.jpg')} />
                    </li> */}
                  </ul>
                  {
                    index > 1 ?
                    <>
                    {
                      currentIndex > 0 &&
                      <button className='post-in-Btn prev' onClick={()=>{setCurIndex(currentIndex-1);}}>
                      <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                      </button>
                    }
                    {
                      currentIndex < index-1 &&
                      <button className='post-in-Btn next' onClick={()=>{setCurIndex(currentIndex+1);}}>
                      <FontAwesomeIcon icon={faCircleChevronRight} size="xl" />
                      </button>
                    }
                    </>
                    : null
                  }
                
                </div>
                
              </div>
              <div className='detail-comment'>
                <div>
                  <div className='detail-comment-panel'>

                    <div className='detail-comment-top'>
                      <div>
                        <div className='detail-profile'>
                          <div>
                            <img src={profile} />
                          </div>

                          <div className='detail-nick'>
                            <div>
                              <span>{postData.nickname}</span>
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
                                    <img alt='프로필' src={require('../../Image/my.jpg')}/>
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
                                          <img alt='프로필' src={require('../../Image/my.jpg')}/>
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
                                                    <img alt='프로필' src={require('../../Image/my.jpg')}/>
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
                                                    <img alt='프로필' src={require('../../Image/my.jpg')}/>
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
                          <img src={require('../../Image/un_like.png')}/>
                        </span>
                        <span>
                          <img src={require('../../Image/bubble.png')}/>
                        </span>
                      </section>

                      <section className='detail-like'>
                        좋아요 1.2만개
                      </section>

                      <div className='detail-date'>
                        {date}
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
    </div>

    </>
  )
}

export default Post;