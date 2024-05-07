import '../Css/CommentPopup.css';

function CommentPopup(){
  return(
    <>
      <div className="m-popup-main">
      <div className='m-close'><img alt='Close' src={require('../../Image/close.png')}/></div>
      <div className='m-popupDim' onClick={()=>{console.log('클릭')}}></div>
        <div className='m-sub-main'>
          <div className='m-popup-box'>
            <div className='popup-buttons'>
              <button style={{color: 'red', fontWeight:600}}>삭제</button>
              <button>취소</button>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default CommentPopup;