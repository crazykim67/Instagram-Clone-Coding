import './CPopup.css';

function CPopup(){
  return(
    <>
      <div className='popupDim'></div>
      <div className='popup-main'>
        <div>
          <div className='popup-box'>
            <div>
              <div className='popup-top'>
                <h3>게시물을 삭제하시겠어요?</h3>
                <p>지금 나가면 내용이 저장되지 않습니다.</p>
              </div>
              <div className='popup-buttons'>
                <button style={{color:'red', fontWeight:'600'}}>삭제</button>
                <button>취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CPopup;