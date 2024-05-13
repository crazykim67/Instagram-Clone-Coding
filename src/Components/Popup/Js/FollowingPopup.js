import '../Css/FollowPopup.css';
import { useEffect, useState } from 'react';
import Followingitem from './Followingitem.js';

function FollowPopup({setFollowingList, following, userInfo, setUserInfo}){

  useEffect(()=>{
    setSearchFollowData(following);
  }, [])

  let [searchText, setSearchText] = useState('');
  let [searchFollowData, setSearchFollowData] = useState([]);

  useEffect(()=>{
    if(searchText.length > 1)
      getSearchUser(searchText);
    else
      setSearchFollowData(following);
  }, [searchText])

  const getSearchUser = (_text) => {
    if(!userInfo)
      return;

    let _searchText = _text.toLowerCase();

    let _searchUserList = userInfo.follow.filter(_user => {
      const nicknameMatches = _user.nickname.toLowerCase().includes(_searchText);
      const nameMatches = _user.name.toLowerCase().includes(_searchText);
      return nicknameMatches || nameMatches;
    });

    setSearchFollowData(_searchUserList);
  }

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
                    <h1>팔로잉</h1>
                  </div>
                </div>
                <div className='f-popup-search'>
                  <div>
                    <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} placeholder='검색' type='text'/>
                  </div>
                </div>
                <div className='f-popup-body'>
                  <div>
                    <div className='follow-list'>
                      {
                        searchFollowData != null &&
                        searchFollowData.map((a, i)=>{
                          return(
                            <Followingitem key={i} data={a} userInfo={userInfo} setFollowData={setSearchFollowData} setUserInfo={setUserInfo}/>
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