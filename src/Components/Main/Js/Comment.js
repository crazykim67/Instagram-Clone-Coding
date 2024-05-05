import { fire, storage } from '../../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Comment(){
  let [reply, setReply] = useState(false);

  return(
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
                  // TODO: 대댓글 - 답글 보기(1개)
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
  )
}

export default Comment;