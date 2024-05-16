import '../Css/Stories.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import default_img from '../../Image/empty_profile.jpg';

function Stories(){

  const onErrorImg = (e) => {
    e.target.src = default_img
  }

  let userData = useSelector((state) => state.currentUser );
  let navigate = useNavigate();
  let [profile, setProfile] = useState('');
  useEffect(()=>{
    getProfile();
  }, [])
  const getProfile = () => {
    const storageRef = ref(storage, `userProfile/${userData.email}.jpg`)
    getDownloadURL(storageRef)
    .then((url)=>{
      setProfile(url);
  });
}
  let [width, setWidth] = useState(0);

  useEffect(() => {
    const incrementValue = () => {
      if (width < 100) {
        setWidth(prevValue => prevValue + 1);
      }
    };

    const timer = setInterval(incrementValue, 50); // 50밀리초마다 값을 증가시킴

    // 3초가 지난 후에 타이머를 제거
    setTimeout(() => {
      clearInterval(timer);
    }, 5000);

    if (width >= 100) {
      navigate('/main');
    }

    return () => clearInterval(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, [width]);

  return(
    <div className='story-main'>
      <section>
        <div className='stroy-body'>
          <div>

            <div className='story-item' style={{transform: `translate(${460*1.6}px)`, scale: '1'}}>
              <section>
                <div className='story-img'>
                  <img src={require('../../Image/1.jpg')}/>
                </div>
                <div className='stroy-item-header'>
                  <div className='story-bar'>

                    <div>
                      <div className='empty-bar'></div>
                      <div className='bar' style={{width:`${width}%`}}></div>
                    </div>

                    {/* <div>
                      <div className='empty-bar'></div>
                      <div className='bar' style={{width:'32%'}}></div>
                    </div>

                    <div>
                      <div className='empty-bar'></div>
                      <div className='bar' style={{width:'0%'}}></div>
                    </div> */}

                  </div>
                  <div className='story-profile'>
                    <div className='s-profile'>
                      <img onError={onErrorImg} src={profile}/>
                    </div>
                    <div className='s-profile-nickname'>
                      <span>{userData.nickname}</span>
                    </div>
                  </div>
                </div>
                
                <div>

                </div>
              </section>
            </div>
            
          </div>
        </div>
        <div className='story-home-logo'>
          <h2 onClick={()=>{navigate('/main')}}>Pilstagram</h2>
        </div>
        <div className='story-close'>
          <img onClick={()=>{navigate('/main')}} src={require('../../Image/close.png')} />
        </div>
      </section>
    </div>
  )
}

export default Stories;