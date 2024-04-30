import '../Css/CPopup.css';

function CPopup({setFiles, setPopup, setCreate, index, setIndex, exit, setText}){
  return(
    <>
      <div className='popup-main'>
        <div onClick={()=>{
            setPopup(false);
          }}className='popupDim'></div>
        <div className='popup-sub-main'>
          <div className='popup-box'>
            <div>
              <div className='popup-top'>
                <h3>게시물을 삭제하시겠어요?</h3>
                <p>지금 나가면 내용이 저장되지 않습니다.</p>
              </div>
              <div className='popup-buttons'>
                <button onClick={()=>{
                  if(exit === true){
                    setPopup(false);
                    // TODO: 게시글 초기화
                    setText('');
                    setIndex(0);
                    setCreate(false);
                    setFiles([]);
                  }
                  else {
                    setIndex(index-1);
                    setPopup(false);
                    setText('');

                    if(index-1 == 0){
                      setFiles([]);
                    }
                  }
                }} style={{color:'red', fontWeight:'600'}}>삭제</button>
                <button onClick={()=>{
                  setPopup(false);
                  }}>취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CPopup;