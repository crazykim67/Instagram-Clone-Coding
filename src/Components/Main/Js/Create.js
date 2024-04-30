import '../Css/Create.css';
import { useEffect, useState, useRef } from 'react';
import { faPhotoFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import CPopup from '../../Popup/Js/CPopup.js';

function Create({index, setIndex, setCreate}){
  const inputRef = useRef();
  const onHandlerInput = () => {
    inputRef.current?.click();
  }

  const [files, setFiles] = useState([]);
  useEffect(()=>{
    files.map((a)=>{
      console.log(a.type);
    })
  }, [files]);

  const [text, setText] = useState('');
  // TODO: 미디어 Index State 
  const [mediaIndex, setMediaIndex] = useState(0);
  const [maxMediaIndex, setMaxIndex] = useState(0);
  const [popUp, setPopup] = useState(false);

  // TODO: 게시물 만들기 팝업 강제종료 여부
  const [exit, setExit] = useState(false);

  // TODO: 파일 선택 완료
  useEffect(()=>{
    if(files.length > 0){
      setIndex(1);
      setMaxIndex(files.length - 1);
    }
  }, [files])

  return(
    <>
      {
        popUp == true ? <CPopup setFiles={setFiles} setPopup={setPopup} setCreate={setCreate} index={index} setIndex={setIndex} exit={exit} setText={setText}/> : null
      }
      <div className='create-body'>
        <div className='close' onClick={()=>{
          if(!popUp &&  index >= 1){
            setExit(true);
            setPopup(true);
          }
          else{
            setExit(false);
            setCreate(false);
          }
        }}>
          <img alt='Close' src={require('../../Image/close.png')}/>
        </div>
        <div className='create-panel'>
            <div className='dim' onClick={()=>{ 
              setExit(true);
              if(!popUp &&  index >= 1){
                setPopup(true);
              }
              else {
                setCreate(false);
              }
          }}></div>
            <div className='create-main'>
              <div className={`create-box ${index > 1 ? 'write' : ''}`}>
                <div>
                  {
                  <>
                    {
                      // TODO: 사진 고르기
                     index === 0 &&  
                     <>
                      <div className='create-post-top'>
                      <h1>새 게시물 만들기</h1>
                      </div>
                      <div className='create-post-body'>
                        <div>
                          <div className='files-icon'>
                            <FontAwesomeIcon icon={faPhotoFilm} size='5x' />
                          </div>
                          <div className='files-upload-please'>
                            사진과 동영상을 올려주세요
                          </div>
                          <div className='file-upload-btn'>
                            <input type='file'accept='.jpg, .jpeg, .png, .mp4'  multiple style={{display:'none'}} ref={inputRef} onChange={(e)=>{
                              setFiles(Array.from(e.target.files));
                            }} />
                            <button onClick={() => {
                              onHandlerInput();
                            }}>
                              컴퓨터에서 선택
                            </button>
                          </div>
                        </div>
                      </div> 
                    </>
                    }
                    {
                      // TODO: 사진 확인
                      index === 1 &&
                      <>
                      <div className='create-post-selected-top'>
                        <div className='create-selected-prev' onClick={()=>{
                          if(!popUp &&  index == 1){
                            setExit(false);
                            setPopup(true);
                          }
                        }}>
                          이전
                        </div>
                        <div className='create-selected-font'>
                          사진 확인
                        </div>
                        
                        <div className='create-selected-next' onClick={()=>{
                          setIndex(2);
                        }}>
                          다음
                        </div>
                      </div>
                      <div className='create-select-body'>
                        {
                          files.length > 1 ? 
                          <>
                          {
                            mediaIndex > 0 ?
                            <span className='prev' onClick={()=>{setMediaIndex(mediaIndex - 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                            </span> : null
                          }
                          {
                            mediaIndex < maxMediaIndex ?
                            <span className='next' onClick={()=>{setMediaIndex(mediaIndex + 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                            </span> : null
                          }
                            
                          </> 
                          : null
                        }
                        {
                          files[mediaIndex].type != 'video/mp4' ?
                          <div>
                          {/* <img src={require('../../Image/my.jpg')}/> */}
                          <img src={URL.createObjectURL(files[mediaIndex])}/>
                          </div> :
                          <div>
                          <video controls={false} autoPlay={true} loop={false} preload={'auto'}>
                            <source src={require('../../videos/video.mp4')}/>
                          </video>
                          </div>
                        }
                        
                      </div>
                      </>
                    }

                    {
                      // TODO: 글 작성
                      index === 2 &&
                    <>
                      <div className='create-post-selected-top'>
                        <div className='create-selected-prev' onClick={()=>{
                          if(!popUp &&  index == 2){
                            setExit(false);
                            setPopup(true);
                          }
                        }}>
                          이전
                        </div>
                        <div className='create-selected-font'>
                          새 게시물 만들기
                        </div>
                        
                        <div className='create-selected-next'>
                          공유
                        </div>
                      </div>
                      <div className='w-create-body'>
                        
                        <div className='w-create-select-body'>
                        {
                          files.length > 1 ? 
                          <>
                          {
                            mediaIndex > 0 ?
                            <span className='prev' onClick={()=>{setMediaIndex(mediaIndex - 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                            </span> : null
                          }
                          {
                            mediaIndex < maxMediaIndex ?
                            <span className='next' onClick={()=>{setMediaIndex(mediaIndex + 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                            </span> : null
                          }
                            
                          </> 
                          : null
                        }
                        {
                          files[mediaIndex].type != 'video/mp4' ?
                          <div>
                          {/* <img src={require('../../Image/my.jpg')}/> */}
                          <img src={URL.createObjectURL(files[mediaIndex])}/>
                          </div> :
                          <div>
                          <video controls={false} autoPlay={true} loop={false} preload={'auto'}>
                            <source src={require('../../videos/video.mp4')}/>
                          </video>
                          </div>
                        }
                        </div> 
                        <div className='w-create-main'>
                          <div>
                            <div className='w-create-profile'>
                              <div>
                                <div className='w-create-profile-img'>
                                  <img src={require('../../Image/my.jpg')}/>
                                </div>
                                <div className='w-create-profile-nickname'>
                                  닉네임
                                </div>
                              </div>
                            </div>
                            <div className='w-create-input'>
                              <div value={text} onInput={(e)=>{setText(e.target.textContent)}} className='w-create-textBox' contentEditable="true" role="textbox" spellcheck="true" data-lexical-editor="true" style={{wordWrap:'break-word'}}>
                                
                              </div>
                              {
                                text.length > 0 ? null : <div className='w-create-placeHolder'>문구를 입력하세요..</div>
                              }
                              
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </>
                    }
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
      
    </>
  )
}

export default Create