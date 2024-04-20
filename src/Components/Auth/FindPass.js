import './FindPass.css';
import Header from './Header.js';
import Footer from './Footer.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db, firebaseAuth, sendPasswordResetEmail } from '../firebase.js';
import { ref, set } from 'firebase/database';

function FindPass() {
    let navigate = useNavigate();

    const [value, SetValue] = useState('');
    const changeValue = (text) => {
      let copy = value;
      copy = text;
      SetValue(copy);
    }

    const [isCheck, SetCheck] = useState(false);
    const changeCheck = (email) => {
      let copy = isCheck;
      copy = email;
      SetCheck(copy);
    }

    // TODO: 이메일 유효성 체크
    function emailCheck(email_address) {
    const email_regex = /^[a-zA0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(!email_regex.test(email_address))
      return false;
    else
      return true;
    }

    const sendPassword = async (e) => {
      e.preventDefault();
      try {
        await sendPasswordResetEmail(firebaseAuth, value);
        alert('성공적으로 메일을 보냈습니다.');
        navigate('/Instagram/');
      }
      catch(err)
      {
        console.log(err);
      }
    }

    return (
    <>
    <header>
      <Header/>
    </header>

    <div className='base'>
        <div className='panel'>
          <div className='p-top'>
            <span></span>
          </div>
          <div className='p-body'>
            <span className='problem'>로그인에 문제가 있나요?</span>
            <span className='problem-ex'>이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 링크를 보내드립니다.</span>
          </div>
          <div>
            <form method='post' onSubmit={(e)=>{sendPassword(e);}}>
                <div className='input-li'>
                  <div>
                    <span>
                      {
                        value.length > 0 ? '' : '이메일'
                      }
                    </span>
                    <input value={value}
                    onChange={(e) => {
                      changeValue(e.target.value); changeCheck(emailCheck(e.target.value));
                    }}
                    className={`email-input`} aria-label='이메일' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={40} type='text' name='email'/>
                  </div>
                </div>
                <div className='findBtnArea'>
                  {
                    isCheck == true ? 
                    <button className='find-btn enable' type='submit' >비밀번호 재설정 링크 보내기</button> :
                    <button className='find-btn enable' type='submit' disabled>비밀번호 재설정 링크 보내기</button>
                  }
                </div>
            </form>
          </div>

          <div className='orArea'>
            <div>
              <div className='underline'></div>
                <div className='or'>
                  또는
                </div>
              <div className='underline'></div>
            </div>
          </div>
          <div className='newBtn'>
            <span onClick={()=>{navigate('/register')}}>새 계정 만들기</span>
          </div>

          <div className='backLogin'>
            <span onClick={()=>{ navigate('/Instagram/');}}>로그인으로 돌아가기</span>
          </div>
        </div>
      </div>

    <footer className='footer'>
      <Footer/>
    </footer>
    </>
  )
}

export default FindPass