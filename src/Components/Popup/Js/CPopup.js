import '../Css/CPopup.css';

function CPopup({setFiles, setPopup, setCreate, index, setIndex, exit, setExit, setText, setMaxIndex}){
  const InitPopup = () => {
    setFiles([]);
    setIndex(0);
    setMaxIndex(0);
    setText('');
  }
  
  return(
    <>
      <div className='popup-main'>
        <div onClick={()=>{
            setExit(false);
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
                    // TODO: 게시글 초기화
                    InitPopup();
                    setCreate(false);
                  }
                  else {
                    if(index-1 <= 0){
                      InitPopup();
                    }
                    else{
                      setIndex(index-1);
                      setText('');
                    }
                  }
                  setPopup(false);
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