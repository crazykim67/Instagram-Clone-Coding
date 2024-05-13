import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { ref, getDownloadURL } from "firebase/storage";
import { fire, storage } from '../../firebase.js';
import default_img from '../../Image/empty_profile.jpg';
import { useSelector } from 'react-redux';
import MainPostItem from "./MainPostItem.js";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Post from "./Post.js";

function MainPost({data, postDatas, setPostDatas, setPost, setCurrentPost}) {

  let userData = useSelector((state) => state.currentUser );

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  // TODO: 작성자 게시물 시간
  let [dateTime, setDateTime] = useState('');
  useEffect(()=>{
    if(data){
      const seconds = (data.date).seconds;
      const nanoseconds = (data.date).nanoseconds;
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
  }, [])

  // 게시물 프로필
  const [profile, setProfile] = useState('');
  useEffect(()=> {
    if(data.email != ''){
      const storageRef = ref(storage, `userProfile/${data.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  }, []);

  let [index, setIndex] = useState(0);
  let [maxIndex, setMaxIndex] = useState(0);

  // 게시물 Index 설정
  useEffect(()=> {
    setIndex(0);
    setMaxIndex(data.media.length);
    setPrevVideoIndex(0);
  }, [])

  let videoRef = useRef([]);
  let [prevVideoIndex, setPrevVideoIndex] = useState(0);
  const onClickVideo = () => {
    if(videoRef.current){
      // TODO: 현재 보는 비디오가 정지상태이면
      if(videoRef.current[index]?.paused){
        videoRef.current[index]?.play();
      }
      else{
        videoRef.current[index]?.pause();
      }
    }
  }

  // TODO: Nav 버튼
  const onClickNavBtn = () => {
    if(!videoRef.current[prevVideoIndex])
      return;

    if(!videoRef.current[prevVideoIndex].paused){
      videoRef.current[prevVideoIndex]?.pause();
      videoRef.current[prevVideoIndex].currentTime = 0;
    }
  }

  const onClickMuteBtn = (isMute) => {
    if(!videoRef.current[index])
      return;

    videoRef.current[index].muted = !isMute;
  }

  // TODO: 좋아요 관련
  let [like, setLike] = useState(false);
  useEffect(()=>{
    getLike();
  },[ , data])
  
  const getLike = () => {
    if(!data)
      return;

    const likeData = data.likes;
    let isLike = likeData.some(_like => _like.email === userData.email);
    
    setLike(isLike);
  }

  const setLikes = async () => {
    if(!data)
      return;

    const likeData = data.likes;
    let isLike = likeData.some(_like => _like.email === userData.email);

    const docRef = doc(fire, 'postData', data.email);
    let updateData = null;

    // UnLike
    if(!isLike){
      updateData = {
        [`${data.uuid}`] : [{
          ...data,
          "likes": [{"email":userData.email, "nickname":userData.nickname}, ...data.likes, ],
        }]
      };
    }
    // Like
    else {
      const unLikeData = data.likes.filter(_like => _like.email !== userData.email);
      updateData = {
        [`${data.uuid}`] : [{
          ...data,
          "likes": unLikeData,
        }]
      };
    }

    setLike(!isLike);
    await updateDoc(docRef,updateData);
    updateState(updateData[data.uuid][0]);
  }

  const updateState = (_updateData) => {

    let updatePostDatas = postDatas.map((item) => {
      if(item.uuid === _updateData.uuid)
        return _updateData;
      else
        return item;
    });

    setPostDatas(updatePostDatas);
  }

  return(
    <>
    <section className='post-panel'>
      <div className='post-top'>
        <div>
          <div className='post-top-profile'>

            <div>
              <span>
                <img onError={onErrorImg} src={profile}/>
              </span>
            </div>

          </div>

          <div className='post-top-info'>
            <div className='post-top-info-nick'>
              <div className='info-nick'>{data.nickname}</div>
              <span>●</span>
              <div className='info-date'>{dateTime}</div>
            </div>
            <div className='info-type'>
              <span>
                원본
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
                    {
                      data && data.media &&
                      data.media.map((a, i)=> {
                        return(
                          <MainPostItem key={i} mediaData={a} mediaIndex={i} transX={index} videoRef={videoRef} onClickVideo={onClickVideo} onClickMuteBtn={onClickMuteBtn}/>
                        )
                      })
                    }
                  </ul>
                  {
                    maxIndex > 1 &&
                    <>
                    {
                      index > 0 &&
                        <button className='prev postBtn' onClick={()=>{setIndex(index-1); onClickNavBtn(); setPrevVideoIndex(index - 1);}}>
                          <div>
                            <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                          </div>
                        </button>
                    }
                    {
                      index < maxIndex-1 &&
                      <button className='next postBtn' onClick={()=>{setIndex(index+1); onClickNavBtn();setPrevVideoIndex(index + 1);}}>
                        <div>
                          <FontAwesomeIcon icon={faCircleChevronRight} size="xl" />
                        </div>
                      </button>
                    }
                    </>
                  }
                  
                  
                  
                </div>
              
            </div>
          </div>

      </div>

      <div className='post-footer'>
        <div className='footer-content'>
          <div>
            <span onClick={()=>{setLikes();}} className='like'>
              {
                like === false ? <img className='footer-content-img' src={require('../../Image/un_like.png')}/> : <img className='footer-content-img' src={require('../../Image/like.png')}/>
              }
            </span>
            <span onClick={()=>{setCurrentPost(data); setPost(true);}} className='comment'>
              <img className='footer-content-img' src={require('../../Image/bubble.png')}/>
            </span>
          </div>
        </div>
        <div className='footer-like'>
          좋아요 {data.likes.length}개
        </div>
        <div className='post-write'>
          <span className='post-write-nick'>
            {data.nickname}
          </span>
          <div className='post-writing'>
            <span>
              {data.content}
            </span>
          </div>
        </div>
        <div onClick={()=>{setCurrentPost(data); setPost(true);}} style={{cursor:'pointer'}} className='post-write-comment'>
            댓글 {data.comment.length}개 보기
        </div>
      </div>

    </section>
  </>
  )
}

export default MainPost;