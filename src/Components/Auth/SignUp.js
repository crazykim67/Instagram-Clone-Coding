import { useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import './SignUp.css';
import { useState } from 'react';
import { fire, firebaseAuth, createUserWithEmailAndPassword } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

function SignUp(){

  let navigate = useNavigate();

  const [user, setValue] = useState(["", "", "", ""])

  const changeValue = (i, text) => {
    let copy = [...user];
    copy[i] = text;
    setValue(copy);
  }

  const [isCheck, SetCheck] = useState([false, false, false, false]);
  const changeCheck = (email, name, nickname, password) => {
    let copy = [...isCheck];
    copy[0] = email;
    copy[1] = name;
    copy[2] = nickname;
    copy[3] = password;

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

  // TODO: 성명 체크
  function nameCheck(name){
    if(name.length < 3)
      return false
    else
      return true
  }

  // TODO: 닉네임 체크
  function nickNameCheck(nick){
    if(nick.length < 3)
      return false
    else
      return true
  }

  // TODO: 비밀번호 체크
  function passwordCheck(password){
    if(password.length < 6)
      return false
        else
      return true
  }

  const register = async (e) => {
    e.preventDefault();
    const createdUser = await createUserWithEmailAndPassword(firebaseAuth, user[0], user[3])
      try{
        const index = user[0].indexOf('@');
        const userId = user[0].substring(0, index);

        // TODO: ReatimeDatabase Write
      //   set(ref(db, `users/${userId}`), {
      //     email : user[0],
      //     name : user[1],
      //     nickname : user[2],
      // });
      
      await setDoc(doc(fire, 'userList', user[0]), {
        email: user[0],
        name: user[1],
        nickname: user[2],
      });

      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate('/Instagram/');
      }catch(err){
        switch(err.code) {
          case 'auth/weak-password':
        // 약한 비밀번호 오류 처리
        alert('비밀번호는 6자리 이상이어야 합니다.');
        break;
      case 'auth/invalid-email':
        // 유효하지 않은 이메일 오류 처리
        alert('유효하지 않은 이메일 주소입니다.');
        break;
      case 'auth/email-already-in-use':
        // 이미 사용 중인 이메일 오류 처리
        alert('이미 가입된 이메일 주소입니다.');
        break;
      default:{
        alert('회원가입 오류가 발생하였습니다.');
        break;
      }
      } 
    }
  }

  return (
    <>
      <div className="base">
        <div className="panel">

          <div className='box'>

            <div className='logo'>
              <h1>Pilstagram</h1>
            </div>

            <div className='formBox'>
              <form className='formContent'onSubmit={(e)=> register(e)}  methods='post'>

                <span>
                  친구들의 사진과 동영상을 보려면 가입하세요.
                </span>
                
                <div className='input-li'>
                  <div>
                    <span>
                      {
                        user[0].length > 0 ? '' : '이메일'
                      }
                    </span>
                    <input value={user[0]}
                    //onFocus = {()=>{changeFocus(0, true)}}
                    //onBlur={()=>{changeFocus(0, false)}} 
                    onChange = {(e)=>{changeValue(0, e.target.value); changeCheck(emailCheck(e.target.value), nameCheck(user[1]), nickNameCheck(user[2]), passwordCheck(user[3]))}} 
                    className={`register-input`} aria-label='이메일' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={40} type='text' name='email'/>
                  </div>
                </div>

                <div className='input-li'>
                  <div>
                    <span>
                      {
                        user[1].length > 0 ? '' : '성명'
                      }
                    </span>
                    <input value={user[1]}
                    //onFocus = {()=>{changeFocus(0, true)}}
                    //onBlur={()=>{changeFocus(0, false)}} 
                    onChange = {(e)=>{changeValue(1, e.target.value); changeCheck(emailCheck(user[0]), nameCheck(e.target.value), nickNameCheck(user[2]), passwordCheck(user[3]))}} 
                    className={`register-input`} aria-label='성명' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={5} type='text' name='name'/>
                  </div>
                </div>
                
                <div className='input-li'>
                  <div>
                    <span>
                      {
                        user[2].length > 0 ? '' : '사용자이름'
                      }
                    </span>
                    <input value={user[2]}
                    //onFocus = {()=>{changeFocus(0, true)}}
                    //onBlur={()=>{changeFocus(0, false)}} 
                    onChange = {(e)=>{changeValue(2, e.target.value); changeCheck(emailCheck(user[0]), nameCheck(user[1]), nickNameCheck(e.target.value), passwordCheck(user[3]))}} 
                    className={`register-input`} aria-label='사용자이름' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={12} type='text' name='nickname'/>
                  </div>
                </div>
                <div className='input-li'>
                  <div>
                    <span>
                      {
                        user[3].length > 0 ? '' : '비밀번호'
                      }
                    </span>
                    <input value={user[3]}
                    //onFocus = {()=>{changeFocus(0, true)}}
                    //onBlur={()=>{changeFocus(0, false)}} 
                    onChange = {(e)=>{changeValue(3, e.target.value); changeCheck(emailCheck(user[0]), nameCheck(user[1]), nickNameCheck(user[2]), passwordCheck(e.target.value))}} 
                    className={`register-input`} aria-label='비밀번호' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={20} type='password' name='password'/>
                  </div>
                </div>
                <div className='registerArea'>
                  {
                    isCheck[0] && isCheck[1] && isCheck[2] && isCheck[3] ? <button className='loginBtn enable' type='submit'>가입</button> : <button className='loginBtn disable' type='submit' disabled>가입</button>
                  }
                </div>
              </form>
            </div>

          </div>
          
          <div className='go-to-login'>
            <span>
              <p>
                계정이 있으신가요?
                <a>
                  <span onClick={()=>{navigate('/Instagram/');}}> 로그인</span>
                </a>
              </p>
            </span>
          </div>

        </div>

      </div>
      
      <footer className='registerFoot'>
        <Footer/>
      </footer>
    </>
  )
} 

export default SignUp