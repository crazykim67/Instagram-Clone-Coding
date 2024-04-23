import { createSlice } from '@reduxjs/toolkit'

let currentUser = createSlice({
  name : 'currentUser',
  initialState : {email : '', name : '', nickname : ''},
  reducers : {
    setEmail(state, _email){
      state.email = _email.payload;
      console.log(state.email)
    },
    setName(state, _name){
      state.name = _name.payload
      console.log(state.name)
    },
    setNickName(state, _nickname){
      state.nickname = _nickname.payload
      console.log(state.nickname)
    },
  }
})

export let { setEmail, setName, setNickName } = currentUser.actions

export default currentUser;