import { useEffect, useState } from 'react';
import '../Css/Main.css';
import { useNavigate } from 'react-router-dom';
import { signOut, firebaseAuth, fire, storage } from '../../firebase.js';
import { useSelector } from 'react-redux';
import { ref, getDownloadURL } from "firebase/storage";
import { collection, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Create from './Create.js';
import default_img from '../../Image/empty_profile.jpg';
import Recommend from './Recommend.js';
import { query } from 'firebase/database';
import SearchItem from './SearchItem.js';
import MainPost from './MainPost.js';

function Main() {

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let navigate = useNavigate();

  const onSignOut = async () => {
    try{
      await signOut(firebaseAuth)
      alert('로그아웃되었습니다. 로그인 후 이용해주세요.');
      navigate('/Instagram/');
    }
    catch(err){
      console.log(err);
    }
  }

  let userData = useSelector((state) => state.currentUser );
  
  // TODO: 로그인 후 프로필 이미지 설정
  const [profile, setProfile] = useState('');
  useEffect(()=> {
    if(userData.email != ''){
      const storageRef = ref(storage, `userProfile/${userData.email}.jpg`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setProfile(url);
      })
    }
  });

  // TODO: 게시물 만들기 팝업 열기/닫기 State
  let [create, setCreate] = useState(false);
  // TODO: 게시물 만들기 Index
  let [index, setIndex] = useState(0);

  // TODO: 검색 관련
  let [search, setSearch] = useState(false);
  let [searchText, setSearchText] = useState('');
  let [userList, setUserList] = useState();
  let [searchUserList, setSearchUserList] = useState([]);

  useEffect(()=>{
    getUser();
  }, []) 

  useEffect(()=>{
    if(searchText.length > 0)
      getSearchUser(searchText);
    else
      setSearchUserList([]);
  }, [searchText])

  const getUser = async () => {
    const q = query(collection(fire, 'userList'), where('email', '!=', null));
    const snapShot = await getDocs(q);
    let userValue = [];
    snapShot.forEach((doc)=>{
      userValue.push(doc.data());
    })

    const userListData = userValue.filter(_user => _user.email !== userData.email);
    setUserList(userListData);
  }

  const getSearchUser = (_text) => {
    if(!userList)
      return;

    let _searchText = _text.toLowerCase();

    let _searchUserList = userList.filter(_user => {
      const nicknameMatches = _user.nickname.toLowerCase().includes(_searchText);
      const nameMatches = _user.name.toLowerCase().includes(_searchText);
      return nicknameMatches || nameMatches;
    });

    setSearchUserList(_searchUserList);
  }

  let [myFollowData, setMyFollowData] = useState();
  let [postDatas, setPostDatas] = useState();
  useEffect(()=>{
    getFollowData();
  },[])

  useEffect(()=>{
    if(myFollowData){
      getPostData();
    }
  }, [myFollowData])

  // TODO: 현재 유저가 팔로잉한 유저들 데이터를 가져옴
  const getFollowData = async() => {
    const docRef = doc(fire, `userList`, userData.email);
    const snapShot = await getDoc(docRef);
    let userList = null;
    if(snapShot.exists())
      userList = snapShot.data();

    setMyFollowData(userList.follow);
  }

  // TODO: 현재 유저가 팔로잉한 모든 유저들의 게시물을 가져옴
  const getPostData = async() => {
    if(!myFollowData || myFollowData.length === 0)
      return;

    let _postDatas = [];
    // TODO: 자신의 게시물 가져오기
    const myRef = doc(fire, `postData`, userData.email);
    const myDoc = await getDocData(myRef)
    if(myDoc)
      _postDatas.push(myDoc);

    // TODO: 팔로잉한 유저 게시물 가져오기
    let dataArray = [];
    for(const a of myFollowData){
      const docRef = doc(fire, `postData`, a.email);
      const _postDoc = await getDocData(docRef)
      if(_postDoc)
        _postDatas.push(_postDoc);
    }

    _postDatas.map((_data)=>{
      let values = Object.values(_data);
      for(let value of values){
        dataArray.push(value[0]);
      }

    })

    // TODO: DATE 내림차순
    dataArray.sort((a,b)=> {
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      return 0;
    })
    setPostDatas(dataArray);
  }

  const getDocData = async(_ref) => {
    const snapShot = await getDoc(_ref);
    let postDoc = null;
    if(snapShot.exists() && snapShot.data())
        postDoc = snapShot.data();
    
    return postDoc;
  }

  return (
    <>
      {
        create == true ? <Create index={index} setIndex={setIndex} setCreate={setCreate} profile={profile}/> : null
      }
      <div className='MainPanel'>
        {
          // TODO: left Menu
        }
        <div className='leftPanel' style={{width: `${!search ? 240 : 72}px`, transition:`width 0.2s ease-in-out`}}>
          <div className='l-top'>

            {
              search === false ? <span onClick={()=>{navigate('/main')}}>Pilstagram</span> : <span onClick={()=>{navigate('/main')}}><img src={require('../../Image/instaLogo.png')}/></span>
            }
            
          </div>
          <div className='l-body'>
            <div onClick={()=>{}} className={`body-item`}>
              <div className={`img home`}></div>
              {
                !search && <span>홈</span>
              }
              
            </div>
            <div className={`body-item`} onClick={()=>{
              setCreate(true);
            }}>
              <div className={`img create`}></div>
              {
                !search && <span>만들기</span>
              }
            </div>
            <div onClick={()=>{search && setSearchText(''); setSearch(search => !search);}} className={`body-item`}>
              <div className={`img search`}></div>
              {
                !search && <span>검색</span>
              }
            </div>
            <div className={`body-item`} onClick={()=> {navigate(`/profile/${userData.email}`)}}>
            <div className={`img my-profile`} style={{backgroundImage:`url(${profile})`}}></div>
              {
                !search && <span>프로필</span>
              }
            </div>
          </div>
          {/* <div className='l-footer'>
            <div className={`body-item`}>
              <div className={`img more`}></div>
              {
                !search &&<span>더 보기</span>
              }
            </div>
          </div> */}
        </div>
        <div className='searchPanel' style={{transform: `translateX(${!search ? -470 : 0}px)`, transition:`transform 0.3s ease-in-out`}}>
          <div>
            <div className='search-display'>
              <div className='search-top'>
                <span>검색</span>
              </div>
              <div className='search-body'>
                <div className='search-input'>
                  <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} placeholder='검색' type='text'/>
                  {
                    searchText.length > 0 && <div className='search-remove' onClick={()=>{setSearchText('')}}><img src={require('../../Image/close.png')}/></div>
                  }
                </div>
                <div className='search-hr'></div>
                <div className='search-result-panel'>
                  <div>
                    <div className='search-result-top'>
                      <span>검색 항목</span>
                    </div>
                    <div className='search-result-main'>
                      {
                        searchUserList.map((a, i)=>{
                          return(
                            <SearchItem key={i} sUserData={a}/>
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
        <div className='MainContent'>
          <div className='main-content' onClick={()=>{search && setSearch(false); search && setSearchText('');}}>
            <div>
              <div className='main-top'>
                <div>
                  <ul>

                  <li className='main-to-list'>
                      <div>
                        <div className='list-in-panel'>
                          <div className='list-profile'>
                            <span>
                              <img onError={onErrorImg} src={profile}/>
                            </span>
                          </div>
                          <div className='list-nickname'>
                            내 스토리
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='main-to-list'>
                      <div>
                        <div className='list-in-panel on-story'>
                          <div className='list-profile'>
                            <span className='story-wrap'>
                              <img src={require('../../Image/my.jpg')}/>
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
                        <div className='list-in-panel on-story'>
                          <div className='list-profile'>
                            <span className='none-story-wrap'>
                              <img src={require('../../Image/my.jpg')}/>
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
                <div className='main-body-content'>
                  <div>
                  {
                    // TODO: 게시물 List
                    postDatas && postDatas.map((a, i)=>{
                      return(
                        <MainPost key={i} data={a}/>
                      )
                    })
                  }
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='rightPanel' onClick={()=>{search && setSearch(false); search && setSearchText('');}}>
            <div>
              <div className='profile'>
                <div>
                  <div className='profile-img'>
                    <a>
                      <img onError={onErrorImg} src={profile}/>
                    </a>
                  </div>
                  <div className='user-info'>
                    <div>
                      {userData.nickname}
                    </div>
                    <span>
                      {userData.name}
                    </span>
                  </div>
                  <div onClick={()=>{onSignOut();}} className='profile_Btn'>
                    로그아웃
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

export default Main;