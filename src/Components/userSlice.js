import { createSlice } from '@reduxjs/toolkit'

let currentUser = createSlice({
  name : 'currentUser',
  initialState : {email : '', name : '', nickname : ''},
  reducers : {
    setEmail(state, _email){
      state.email = _email.payload;
      console.log('나 _email 호출');
    },
    setName(state, _name){
      state.name = _name.payload
      console.log('나 _name 호출');
    },
    setNickName(state, _nickname){
      state.nickname = _nickname.payload
      console.log('나 _nickname 호출');
    },
  }
})

export let { setEmail, setName, setNickName } = currentUser.actions

export default currentUser;