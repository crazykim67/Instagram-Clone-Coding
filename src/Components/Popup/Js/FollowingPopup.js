import '../Css/FollowPopup.css';
import { useEffect, useState } from 'react';
import Followingitem from './Followingitem.js';

function FollowPopup({setFollowingList, following, userInfo, setUserInfo}){

  let [followData, setFollowData] = useState();

  useEffect(()=>{
    setFollowData(following);
  }, [])

  return(
    <div className="f-popup-main">
      <div onClick={()=>{setFollowingList(false);}} className='m-close'><img alt='Close' src={require('../../Image/close.png')}/></div>
      <div onClick={()=>{setFollowingList(false);}} className='f-popupDim'></div>
        <div className='f-sub-main'>
          <div className='f-popup-box'>
            <div className='f-popup'>
              <div>
                <div className='f-popup-top'>
                  <div className='f-popup-top-box'>
                    <h1>팔로워</h1>
                  </div>
                </div>
                <div className='f-popup-search'>
                  <div>
                    <input placeholder='검색' type='text'/>
                  </div>
                </div>
                <div className='f-popup-body'>
                  <div>
                    <div className='follow-list'>
                      {
                        followData != null &&
                        followData.map((a, i)=>{
                          return(
                            <Followingitem key={i} data={a} userInfo={userInfo} setFollowData={setFollowData} setUserInfo={setUserInfo}/>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
  )
}

export default FollowPopup;