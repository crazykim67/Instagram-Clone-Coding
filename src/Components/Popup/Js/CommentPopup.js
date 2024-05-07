import { useState } from 'react';
import '../Css/CommentPopup.css';

function CommentPopup({setPopup}){

  return(
    <>
      <div className="m-popup-main">
      <div onClick={()=>{setPopup(false);}} className='m-close'><img alt='Close' src={require('../../Image/close.png')}/></div>
      <div className='m-popupDim' onClick={()=>{setPopup(false);}}></div>
        <div className='m-sub-main'>
          <div className='m-popup-box'>
            <div className='popup-buttons'>
              <button style={{color: 'red', fontWeight:600}}>삭제</button>
              <button onClick={()=>{setPopup(false);}}>취소</button>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default CommentPopup;