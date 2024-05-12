import { createSlice } from '@reduxjs/toolkit'

let currentUser = createSlice({
  name : 'currentUser',
  initialState : {email : '', name : '', nickname : ''},
  reducers : {
    setEmail(state, _email){
      state.email = _email.payload;
    },
    setName(state, _name){
      state.name = _name.payload
    },
    setNickName(state, _nickname){
      state.nickname = _nickname.payload
    },
  }
})

export let { setEmail, setName, setNickName } = currentUser.actions

export default currentUser;