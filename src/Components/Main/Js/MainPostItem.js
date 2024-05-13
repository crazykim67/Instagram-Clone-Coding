import { useEffect, useState } from 'react';

function MainPostItem({mediaData, mediaIndex, transX, videoRef, onClickVideo, onClickMuteBtn}){

  let [data, setData] = useState();
  useEffect(()=>{
    setData(mediaData);
  })

  let [isMute, setMute] = useState(false);

  return(
    <>
    {
      data &&
      data.type === 'image' ?
        <li style={{transform: `translateX(${(468*mediaIndex)+(-468*transX)}px)`, transition:`transform ${0.2}s ease-in-out`}}>
          <img className='post-img' alt='이미지' src={mediaData.url}/>
        </li> : 
        <li style={{transform: `translateX(${(468*mediaIndex)+(-468*transX)}px)`, transition:`transform ${0.2}s ease-in-out`}}>
          <video onClick={onClickVideo} ref={(e)=>{videoRef.current[mediaIndex]=e}} className='post-video' controls={false} loop={false} preload={'auto'}>
            <source src={mediaData.url}/>
          </video>
          <div onClick={()=>{setMute(isMute => !isMute); onClickMuteBtn(isMute);}} className='volumeBtn'>
            {
              !isMute ? <img src={require('../../Image/volume.png')}/> : <img src={require('../../Image/mute.png')}/>
            }
            
          </div>
        </li>
    }
    </>
  )
}

export default MainPostItem;