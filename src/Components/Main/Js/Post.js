import '../Css/Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fire, storage } from '../../firebase.js';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment.js';
import moment from 'moment';
import CommentPopup from '../../Popup/Js/commentPopup.js';

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

  // TODO: 비디오 Index state
  let [videoIndex, setVideoIndex] = useState([]);

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

  // TODO: 작성자 댓글 시간
  let [dateTime, setDateTime] = useState('');
  useEffect(()=>{
    if(postData){
      const seconds = (postData.date).seconds;
      const nanoseconds = (postData.date).nanoseconds;
      const postDate = moment.unix(seconds).add(nanoseconds / 1000000, 'milliseconds');
      const currentDate = moment();
      const diff = currentDate.diff(postDate, 'seconds');

      if(diff < 60)
        setDateTime(`${diff}초`);
      else if(diff < 3600)
        setDateTime(`${Math.floor(diff / 60)}분`);
      else if(diff < 86400)
        setDateTime(`${Math.floor(diff / 3600)}시간`);
      else if(diff < 604800)
        setDateTime(`${Math.floor(diff / 86400)}일`);
      else if(diff < 2628000)
        setDateTime(`${Math.floor(diff / 604800)}주`);
      else
        setDateTime(`방금`);
    }
  }, [postData])

  // TODO: 데이터 변경 감지 시
  useEffect(()=>{
    if(postData){
      setIndex(postData.media.length);
      setVideoIndex([]);
      setMedia(postData.media);
      setCommentData(postData.comment);
      setLikeData(postData.likes);
      dateFormat(postData.date);
    }
  }, [postData]);

  // TODO: 게시물 상세보기 켜고 끌 때
  useEffect(()=>{
    if(postData)
      setCurIndex(0);
  }, [post])

  // TODO: 데이터 변경 감지 시 프로필 설정
  useEffect(()=> {
    if(postData.email != ''){
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

  // TODO: 비디오 Ref 저장
  let videoRef = useRef([]);
  let [prevVideoIndex, setPrevVideoIndex] = useState(0);
  // TODO: currentIndex 변환 시 비디오인지 체크 후 재생 여부
  useEffect(()=>{
    if(videoRef.current){
      // 현재 index가 비디오
      if(videoRef.current[currentIndex]){
          videoRef.current[currentIndex]?.play();
        setPrevVideoIndex(currentIndex);
        // TODO: 다른 비디오로 넘겼을 시에
        if(prevVideoIndex != currentIndex){
          videoRef.current[prevVideoIndex]?.pause();
          if(videoRef.current[prevVideoIndex])
            videoRef.current[prevVideoIndex].currentTime = 0
          setPrevVideoIndex(currentIndex);
        }
      }
      // 현재 index가 비디오가 아니라면
      else{
        {
          videoRef.current[prevVideoIndex]?.pause();
          if(videoRef.current[prevVideoIndex])
            videoRef.current[prevVideoIndex].currentTime = 0
          setPrevVideoIndex(currentIndex);
        }
      }
    }
  }, [currentIndex, mediaData])

  const getType = (_media, index) => {
    let render = null;
    switch(_media.type){
      case 'image':{
        render = 
        <img className='post-detail-img' alt='이미지' src={_media.url} />
        break;
      }
      case 'video':{
        let _videoIndex = index;
        if (!videoIndex.includes(_videoIndex)){
          setVideoIndex(videoIndex => [...videoIndex, _videoIndex]);
        }
        render =
        <>
        <video ref={(e)=>{videoRef.current[_videoIndex] = e}} className='post-detail-video' controls={false} loop={false} preload={'auto'}>
          <source src={_media.url}/>
        </video>
        </>
        
        
        break;
      }
    }
    return render;
  }

  // TODO: 미디어 데이터 렌더링
  const mediaList = () => {
    let list = [];

    for(let i = 0; i < index; i++){
      list.push(
        <li key={i} className='detail-img-list' style={{transform: `translateX(${(700*i)+(-700*currentIndex)}px)`, transition:`transform ${0.2}s ease-in-out`}}>
          {
            getType(mediaData[i], i)
          }
        </li>
      )
    }

    return list;
  }

  // TODO: 해당 게시물 좋아요 여부
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

  // FIXME: 댓글 관련
  let inputRef = useRef();
  let [inputAct, setInputAct] = useState(false);
  let [comment, setComment] = useState('');

  // TODO: 댓글 데이터
  let [commentData, setCommentData] = useState();
  // TODO: 게시 버튼 활성/비활성
  useEffect(()=>{
    if(comment.length > 0)
      setInputAct(true);
    else
      setInputAct(false);

  }, [comment])

  let [comProfile, setComProfile] = useState('');
  // TODO: 유저 댓글 프로필
  useEffect(()=> {
    if(userData.email != ''){
      const storageRef = ref(storage, `userProfile/${userData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setComProfile(url);
      })
    }
  });

  const commentInfo = () => {
    const reply = replyData();
    const commentInfo = {
      "email":String,
      "nickname":String,
      "url":String,
      "comment":String,
      "date":Timestamp,
      "reply":reply
    }
  
    return commentInfo;
  }
  
  const replyData = () =>{
    const replyData = [{
      "email":String,
      "nickname":String,
      "url":String,
      "comment":String,
      "date":Timestamp
    }]
  
    return replyData;
  }

  // TODO: 댓글 데이터 갱신
  const setCommentInfo = async () => {
    const curComment = commentInfo();
    curComment.email = userData.email;
    curComment.nickname = userData.nickname;
    curComment.url = comProfile;
    curComment.comment = comment;
    curComment.date = new Date();
    curComment.reply = [];

    const updateData = {
      [`${postData.uuid}`] : [{
       ...postData,
       "comment": [curComment, ...postData.comment, ],
      }]
    };
    const docRef = doc(fire, `postData`, postData.email);

    setPostData(updateData[postData.uuid][0]);
    await updateDoc(docRef,updateData);
  }
  
  // TODO: 댓글 데이터 삭제
  const deleteCommentInfo = async () => {
    if(selectCommentData){
      const delComment = postData.comment.filter(_comment => _comment !== selectCommentData);

      const updateData = {
        [`${postData.uuid}`] : [{
         ...postData,
         "comment": delComment,
        }]
      };
  
      const docRef = doc(fire, `postData`, postData.email);
  
      setPostData(updateData[postData.uuid][0]);
      await updateDoc(docRef,updateData);
    }
  }
  
  let [selectCommentData, setSelectCommentData] = useState();
  let [popup, setPopup] = useState(false);
  return(
    <>
    {
      popup && <CommentPopup setPopup={setPopup} deleteCommentInfo={deleteCommentInfo}/>
    }
    
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
                                    {
                                      postData.content
                                    }
                                    </span>
                                    <div className='text-time'>
                                      {dateTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </div>

                          {/* 
                            // TODO: 팔로워 댓글 부분
                          */}
                          {
                            commentData != undefined ?
                            commentData.map((a, i)=>{
                              return(
                                <Comment key={i} data={a} inputRef={inputRef} userData={userData} setPopup={setPopup} setSelectCommentData={setSelectCommentData}/>
                              )
                            })
                            :
                            null
                          }
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
                            <textarea ref={inputRef} onChange={(e)=>{
                              setComment(e.target.value);
                            }} value={comment} aria-label='댓글 달기' placeholder='댓글 달기...' autoComplete='off' autoCorrect='off' />
                              {
                                inputAct === false ? <span className='post-un-act'>게시</span> : <span onClick={()=>{setCommentInfo(); setComment(''); }} className='post-act'>게시</span>
                              }
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