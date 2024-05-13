import { useEffect, useState } from 'react';
import Reply from './Reply.js';
import moment from 'moment';

function Comment({data, inputRef, userData, setPopup, setSelectCommentData, setIsPost}){

  const inputFocus = () => {
    inputRef.current.focus();
  }

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
  }, [data])

  let [reply, setReply] = useState(false);

  return(
    <>
      {
        <div className='follower-comment-area'>
          <ul>
            <div className='follower-comment'>
              <li>
                <div className='comment-writing'>
                  <div>
                    <div className='write-profile'>
                      <img alt='프로필' src={data.url}/>
                    </div>

                    <div className='write-comment'>

                      <h2>{data.nickname}</h2>
                      <span className='main-text'>
                        {data.comment}
                      </span>
                      
                      <div className='text-content'>
                        <span>{dateTime}</span>
                        {
                          data.email === userData.email ?
                        <div onClick={()=>{setIsPost(false); setPopup(true); setSelectCommentData(data);}} className='dot-menu'>
                          <img src={require('../../Image/dots_icon.png')}/>
                        </div> :
                        null
                        }
                      </div>

                    </div>
                  </div>
                </div>
                
              </li>
              <li>
                <ul className='reply-panel'>
                  <li>
                    <div onClick={()=>{setReply(reply => !reply)}} className='comment-Hide-Show'>
                      {
                        data.reply.length > 0 ? reply === true ? '- 답글 숨기기' : `- 답글 보이기 (${data.reply.length}개)` : null
                      }
                    </div>
                  </li>
                    {
                        reply && <Reply/>
                    }
                </ul>
              </li>

            </div>

          </ul>
        </div>
      }
    </>
      
  )
}

export default Comment;