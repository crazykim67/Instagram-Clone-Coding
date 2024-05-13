import '../Css/Create.css';
import { useEffect, useState, useRef } from 'react';
import { faPhotoFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import CPopup from '../../Popup/Js/CPopup.js';
import { fire, storage } from '../../firebase.js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, updateMetadata, getDownloadURL  } from "firebase/storage";
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type/index.js';

function Create({index, setIndex, setCreate, profile}){
  const inputRef = useRef();
  const onHandlerInput = () => {
    inputRef.current?.click();
  }

  const [files, setFiles] = useState([]);

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
      setMediaIndex(0);
    }
  }, [files])

  let userData = useSelector((state) => state.currentUser );

  // TODO: 고유 ID 생성
  const GetUniqueId = () => {
    return uuid();
  };

  // TODO: Get File Type Function 
  const GetType = (_file) => {
    let fileName = `${_file.name}`;
    let lastIndex = fileName.lastIndexOf('.');
    let fileType = fileName.slice(lastIndex);
    
    return fileType;
  };

  // TODO: 미디어 파일 메타데이터 설정
  const getMetaData = (_type) => {
    const metaData = _type === '.mp4' ? { contentType: 'video/mp4' } 
    : _type === 'jpg' ? { contentType: 'image/jpeg' } : { contentType: 'image/png' }

    return metaData
  };

  //TODO: 파일 업로드
  const uploadFile = async (_fileRef, _file) => {
    await uploadBytes(_fileRef, _file)
  };

  // TODO: 업로드한 파일 정보 불러오기
  const getFileUrl = async (_fileRef) => {
    return await getDownloadURL(_fileRef);
  };

  const setDocFileType = (_file) => {
    const type = _file.type === 'video/mp4' ? 'video' : 'image'
    return type;
  }

  // TODO: 스토리지 파일 업로드
  const uploadMedia = async (_files, _dirName) => {
    const mediaArray = [];

    for(const file of _files){
      const metaData = getMetaData(GetType(file));

      const fileRef = ref(storage, `postData/${userData.email}/${_dirName}/${file.name}`);
      // TODO: 파일 Type 변환
      await updateMetadata(fileRef, metaData);
      await uploadFile(fileRef, file);

      const url = await getFileUrl(fileRef);
      const fileType = setDocFileType(file);
      mediaArray.push({"type": fileType, "url": url});
    }

    return mediaArray;
  }

// TODO: 파이어베이스 Firestore 갱신
const setFirestore = async (_dirName, _array) => {
  const docRef = doc(fire, `postData`, userData.email);

  const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
      await setDoc(docRef,{
        [`${_dirName}`] : [{
          "uuid": _dirName,
          "date": new Date(),
          "content": text,
          "likes": [],
          "email": userData.email,
          "nickname": userData.nickname,
          "comment": [],
          "media": _array
         }]
       });
    }
    else {
      await updateDoc(docRef,{
        [`${_dirName}`] : [{
           "uuid": _dirName,
           "date": new Date(),
           "content": text,
           "likes": [],
           "email": userData.email,
           "nickname": userData.nickname,
           "comment": [],
           "media": _array
         }]
       });
    }
};

  const OnPost = async () => {
    try {
    // TODO: 고유 ID 생성
      const dirName = GetUniqueId();
      const mediaArray = await uploadMedia(files, dirName)
      
      await setFirestore(dirName, mediaArray);
    }
    catch(e){
      console.error(e);
    }
  }

  const InitPopup = () => {
    setText('');
    setFiles([]);
    setIndex(0);
    setMaxIndex(0);
    setCreate(false);
  }
  return(
    <>
      {
        popUp == true ? <CPopup setFiles={setFiles} setPopup={setPopup} setCreate={setCreate} index={index} setIndex={setIndex} exit={exit} setExit={setExit} setText={setText} setMaxIndex={setMaxIndex}/> : null
      }
      <div className='create-body'>
        <div className='close' onClick={()=>{
          setExit(true);
          if(!popUp &&  index >= 1)
            setPopup(true);
          else
            setCreate(false);
        }}>
          <img alt='Close' src={require('../../Image/close.png')}/>
        </div>
        <div className='create-panel'>
            <div className='dim' onClick={()=>{ 
              setExit(false);
              if(!popUp &&  index >= 1)
                setPopup(true);
              else 
                setCreate(false);
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
                            mediaIndex > 0 &&
                            <span className='prev' onClick={()=>{setMediaIndex(mediaIndex - 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                            </span>
                          }
                          {
                            mediaIndex < maxMediaIndex &&
                            <span className='next' onClick={()=>{setMediaIndex(mediaIndex + 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                            </span>
                          }
                            
                          </> 
                          : null
                        }
                        {
                          files[mediaIndex] && (
                            <>
                              {
                                files[mediaIndex].type != 'video/mp4' ?
                                <div key={mediaIndex}>
                                {/* <img src={require('../../Image/my.jpg')}/> */}
                                <img src={URL.createObjectURL(files[mediaIndex])}/>
                                </div> :
                                <div key={mediaIndex}>
                                <video controls={false} autoPlay={true} loop={false} preload={'auto'}>
                                  <source src={URL.createObjectURL(files[mediaIndex])}/>
                                </video>
                                </div>
                              }
                            </>
                          )
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
                        
                        <div className='create-selected-next' onClick={()=>{
                          OnPost();
                          InitPopup();
                        }}>
                          공유
                        </div>
                      </div>
                      <div className='w-create-body'>
                        
                        <div className='w-create-select-body'>
                        {
                          files.length > 1 ? 
                          <>
                          {
                            mediaIndex > 0 &&
                            <span className='prev' onClick={()=>{setMediaIndex(mediaIndex - 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
                            </span>
                          }
                          {
                            mediaIndex < maxMediaIndex &&
                            <span className='next' onClick={()=>{setMediaIndex(mediaIndex + 1);}}>
                              <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                            </span>
                          }
                            
                          </> 
                          : null
                        }
                        {
                          files[mediaIndex] && (
                            <>
                            {
                              files[mediaIndex].type != 'video/mp4' ?
                              <div key={mediaIndex}>
                              {/* <img src={require('../../Image/my.jpg')}/> */}
                              <img src={URL.createObjectURL(files[mediaIndex])}/>
                              </div> :
                              <div key={mediaIndex}>
                              <video controls={false} autoPlay={true} loop={false} preload={'auto'}>
                                <source src={URL.createObjectURL(files[mediaIndex])}/>
                              </video>
                              </div>
                            }
                            </>
                          ) 
                        }
                        </div> 
                        <div className='w-create-main'>
                          <div>
                            <div className='w-create-profile'>
                              <div>
                                <div className='w-create-profile-img'>
                                  <img src={profile}/>
                                </div>
                                <div className='w-create-profile-nickname'>
                                  {userData.nickname}
                                </div>
                              </div>
                            </div>
                            <div className='w-create-input'>
                              <div value={text} onInput={(e)=>{setText(e.target.textContent)}} className='w-create-textBox' contentEditable="true" role="textbox" spellCheck="true" data-lexical-editor="true" style={{wordWrap:'break-word'}}>
                                
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