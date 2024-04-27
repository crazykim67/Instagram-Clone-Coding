import './Create.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm} from "@fortawesome/free-solid-svg-icons";

function Create(){
  return(
    <>
      <div className='dim'></div>

      <div className='.create-body'>
        <div className='close'>
          <img alt='Close' src={require('../Image/close.png')}/>
        </div>
        <div className='create-panel'>
            <div className='create-main'>
              <div className='create-box'>
                <div>
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
                        <button>
                          컴퓨터에서 선택
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      
    </>
  )
}

export default Create