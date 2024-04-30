import '../Css/Body.css';
import Footer from './Footer.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fire, firebaseAuth, signInWithEmailAndPassword } from '../../firebase.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setName, setNickName } from '../../userSlice.js'
import { doc, onSnapshot } from 'firebase/firestore';

function Body(){

  let navigate = useNavigate();

  // TODO: Input Value
  const [value, setValue] = useState(["", ""]);

  const changeValue = (i, text) => {
    let copy = [...value];
    copy[i] = text;
    setValue(copy);
  }

  // TODO: Input Focus 체크 State
  const [inputFocus, SetFocus] = useState([false, false]);
  const changeFocus = (i, isFocus) => {
    let copy = [...inputFocus];
    copy[i] = isFocus;
    SetFocus(copy);
  }

  // TODO: 이메일, 비밀번호 체크
  const [isCheck, SetCheck] = useState([false, false]);
  const changeCheck = (email, password) => {
    let copy = [...isCheck];
    copy[0] = email;
    copy[1] = password;

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
  // TODO: 비밀번호 유효성 체크
  function passwordCheck(password){
    if(password.length < 6)
      return false;
    else
      return true;
  }

  const [loginErr, SetError] = useState('');
  const LoginFailed = (text) => {
    let copy = loginErr;
    copy = text;
    SetError(copy)
  }

  // TODO: 유저 정보 state(Redux)
  // TODO: userSlice로 요청보내주는 함수
  let dispatch = useDispatch();
  const onLogin = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(firebaseAuth, value[0], value[1])
      onSnapshot(
        doc(fire, 'userList', value[0]), (snapshot) => {
            const userData = snapshot.data();
            dispatch(setEmail(userData.email));
            dispatch(setName(userData.name));
            dispatch(setNickName(userData.nickname));
            navigate('/main');
          }
      )
    }
    catch(err){
      console.log(err);
      LoginFailed('잘못된 계정입니다.');
    }
    // e.preventDefault();
    // await signInWithEmailAndPassword(firebaseAuth, value[0], value[1])
    // .then(() => {
    //   onSnapshot(
    //     doc(fire, 'userList', value[0]), (snapshot) => {
    //       const userData = snapshot.data();
    //       dispatch(setEmail(userData.email));
    //       dispatch(setName(userData.name));
    //       dispatch(setNickName(userData.nickname));
    //       navigate('/main');
    //       }
    //   )
    // })
    // .catch((err) => {
      
    // });
  }

  return(
    <>
    <div className="base common">
        <div className="b-base common">
          <div className='pan'>
            <div className='pan-child common'>
              <section className='baseSec'>
                <main className='baseMain'>
                  <article className='main'>
                    <div className='mainL'>
                      <div className={`screenImg`}>
                      </div>
                    </div>

                    <div className='main-R'>
                      <div className='R-body'>
                        <div className='R-logoArea'>
                          <div className='R-logo'>
                            <h1>Pilstagram</h1>
                          </div>

                          <div className='userForm'>
                            <form className='login' id='loginForm' onSubmit={(e)=>{onLogin(e);}} methods='post'>
                              <div className='loginArea'>
                                {
                                // TODO: ID입력
                                }
                                <div className='login-li '>
                                  <div className={`li-div ${inputFocus[0] == false ? '' : 'focus'}`}>
                                    <label className='login-label'>
                                      <span className='inputSpan'>
                                        {
                                          value[0].length > 0 ? '' : '이메일'
                                        }
                                      </span>
                                      <input value={value[0]} 
                                      onFocus = {()=>{changeFocus(0, true)}}
                                      onBlur={()=>{changeFocus(0, false)}} 
                                      onChange = {(e)=>{changeValue(0, e.target.value); emailCheck(e.target.value); changeCheck(emailCheck(e.target.value), passwordCheck(value[1]));}} 
                                      className={`login-input`} aria-label='이메일' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={40} type='text' name='email'/>
                                    </label>
                                  </div>
                                </div>
                                {
                                // TODO: 비밀번호 입력
                                }
                                <div className='login-li '>
                                  <div className={`li-div ${inputFocus[1] == false ? '' : 'focus'}`}>
                                    <label className='login-label'>
                                      <span>
                                        {
                                          value[1].length > 0 ? '' : '비밀번호'
                                        }
                                      </span>
                                      <input value={value[1]} 
                                      onFocus = {()=>{changeFocus(1, true)}}
                                      onBlur={()=>{changeFocus(1, false)}} 
                                      onChange = {(e)=>{changeValue(1, e.target.value); passwordCheck(e.target.value); changeCheck(emailCheck(value[0]), passwordCheck(e.target.value)); }} 
                                      className={`login-input`}aria-label='비밀번호' aria-required='true' autoCapitalize='off' autoCorrect='off' maxLength={20} type='password' name='password'/>
                                    </label>
                                  </div>
                                </div>
                                {
                                // TODO: 로그인 버튼
                                }
                                <div className='loginBtnArea'>
                                  {
                                    isCheck[0] && isCheck[1] ? 
                                    <button className='loginBtn loginBtnEnable' type='submit'><div>로그인</div></button> : 
                                    <button className='loginBtn loginBtnDisable' type='submit' disabled><div>로그인</div></button>
                                  }
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
                              </div>
                              <div className='erMsg'>
                                {
                                  loginErr.length > 0 ? <span>{loginErr}</span> : null
                                  // <span>잘못된 비밀번호입니다. 다시 확인하세요.</span>
                                }
                              </div>
                              <a className='forgetPass'>
                                <span onClick={()=>{navigate('/find')}}>
                                  비밀번호를 잊으셨나요?
                                </span>
                              </a>
                            </form>
                          </div>

                        </div>
                      </div>
                      <div className='registerBox'>
                        <span>
                          <p>
                            계정이 없으신가요?
                            <a>
                              <span onClick={()=>{navigate('/register')}}> 가입하기</span>
                            </a>
                          </p>
                        </span>
                      </div>
                    </div>

                  </article>
                </main>

                <footer>
                  <Footer/>
                </footer>
              </section>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Body
