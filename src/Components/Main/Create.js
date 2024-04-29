import './Create.css';
import { useEffect, useState, useRef } from 'react';
import { faPhotoFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

function Create(){
  const inputRef = useRef();
  const onHandlerInput = () => {
    inputRef.current?.click();
  }
  const [files, setFiles] = useState([]);
  useEffect(()=>{
    files.map((a)=>{
      console.log(a);
    })
  }, [files]);

  const [text, setText] = useState('');

  return(
    <>
      <div className='dim'></div>

      <div className='.create-body'>
        <div className='close'>
          <img alt='Close' src={require('../Image/close.png')}/>
        </div>
        <div className='create-panel'>
            <div className='create-main'>
              <div className={`create-box write`}>
                <div>
                  {
                  <>
                      {
                      // TODO: 사진 또는 동영상 고르기
                      // <>
                      // <div className='create-post-top'>
                      // <h1>새 게시물 만들기</h1>
                      // </div>
                      // <div className='create-post-body'>
                      //   <div>
                      //     <div className='files-icon'>
                      //       <FontAwesomeIcon icon={faPhotoFilm} size='5x' />
                      //     </div>
                      //     <div className='files-upload-please'>
                      //       사진과 동영상을 올려주세요
                      //     </div>
                      //     <div className='file-upload-btn'>
                      //       <input type='file' multiple style={{display:'none'}} ref={inputRef} onChange={(e)=>{
                      //         setFiles(Array.from(e.target.files));
                      //       }} />
                      //       <button onClick={() => {
                      //         onHandlerInput();
                      //       }}>
                      //         컴퓨터에서 선택
                      //       </button>
                      //     </div>
                      //   </div>
                      // </div> 
                      // </>
                    }

                    {
                      // TODO: 사진 확인
                    // <>
                    // <div className='create-post-selected-top'>
                    //   <div className='create-selected-prev'>
                    //     이전
                    //   </div>
                    //   <div className='create-selected-font'>
                    //     사진 확인
                    //   </div>
                      
                    //   <div className='create-selected-next'>
                    //     다음
                    //   </div>
                    // </div>
                    // <div className='create-select-body'>
                    //   <span className='prev'>
                    //     <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                    //   </span>
                    //   <span className='next'>
                    //     <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                    //   </span>
                    //   <div>
                    //     <img src={require('../Image/my.jpg')}/>
                    //   </div>
                    // </div>
                    // </>
                    }

                    {
                      // TODO: 글 작성
                    <>
                      <div className='create-post-selected-top'>
                        <div className='create-selected-prev'>
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
                          <span className='prev'>
                            <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                          </span>
                          <span className='next'>
                            <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                          </span>
                          <div>
                            <img src={require('../Image/my.jpg')}/>
                          </div>
                        </div> 
                        <div className='w-create-main'>
                          <div>
                            <div className='w-create-profile'>
                              <div>
                                <div className='w-create-profile-img'>
                                  <img src={require('../Image/my.jpg')}/>
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