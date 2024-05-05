import '../Css/Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fire, storage } from '../../firebase.js';
import { doc, setDoc, getDoc, updateDoc, update } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment.js';

function Post({post, setPost, postData, setPostData}){

  let [index, setIndex] = useState(0);
  let [currentIndex, setCurIndex] = useState(0);
  let [mediaData, setMedia] = useState();

  let userData = useSelector((state) => state.currentUser );
  let [profile, setProfile] = useState('');
  let [date, setDate] = useState('');

  // TODO: 좋아요 관련 state
  let [like, setLike] = useState(false);
  let [likeData, setLikeData] = useState();

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
      setLikeData(postData.likes);
      dateFormat(postData.date);
    }

  }, [postData]);

  // TODO: 미디어 데이터 변경 감지 시
  useEffect(()=>{
    // if(mediaData)
    // console.log(mediaData);
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

  // TODO: 현재 게시물에 좋아요를 눌렀는지 안눌렸는지
  useEffect(()=>{
    if(likeData){
      setLike(likeData.some(_like => like.email !== userData.email));
    }
  }, [likeData])
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
        <li key={i} className='detail-img-list' style={{transform: `translateX(${(700*i)+(-700*currentIndex)}px)`, transition:`transform ${0.2}s ease-in-out`}}>
          {
            getType(mediaData[i])
          }
        </li>
      )
    }

    return list;
  }

  useEffect(()=>{
    if(likeData){
      for(let data in likeData){
        if(data.email === userData.email){
          setLike(true)
          break;
        }
      }
    }
  }, [likeData])

  // TODO: 파이어베이스 Firestore 좋아요 데이터 갱신
  const setLikes = async (isLike) => {
    const docRef = doc(fire, `postData`, postData.email);
    
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      if(!isLike){
        // TODO: 좋아요 추가
        const updateData = {
          [`${postData.uuid}`] : [{
           ...postData,
           "likes": [{"email":userData.email, "nickname":userData.nickname, "url":profile}, ...postData.likes, ],
          }]
        };
        setPostData(updateData[postData.uuid][0]);
        await updateDoc(docRef,updateData);
      }
      else {
        // TODO: 좋아요 제거
        const unLikeData = postData.likes.filter(_like => _like.email !== userData.email);
        const updateData = {
          [`${postData.uuid}`] : [{
           ...postData,
           "likes": unLikeData,
          }]
        };
        setPostData(updateData[postData.uuid][0]);
        await updateDoc(docRef,updateData);
      }
    }
  }

  return(
    <>
    
    <div className='postBody'>
      <div className='close' onClick={()=>{setPost(false); setLikeData(); setLike();}}>
        <img alt='Close' src={require('../../Image/close.png')}/>
      </div>
      <div className='post-detail-panel'>
          <div onClick={()=>{setPost(false); setLikeData(); setLike();}} className='dim'></div>
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
                                    <h2>{postData.nickname}</h2>
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
                          <Comment/> 
                        </ul>

                      </div>

                      <section className='detail-content'>
                        <span onClick={()=>{
                          setLikes(likeData.some(_like => like.email !== userData.email));
                          setLike(like => !like);
                        }}>
                          {
                            like === false ? <img src={require('../../Image/un_like.png')}/> : <img src={require('../../Image/like.png')}/>
                          }
                          
                        </span>
                        <span>
                          <img src={require('../../Image/bubble.png')}/>
                        </span>
                      </section>

                      <section className='detail-like'>
                        좋아요 {postData.likes.length}개 
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