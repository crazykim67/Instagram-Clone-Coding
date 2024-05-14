import { createSlice } from '@reduxjs/toolkit'

let currentUser = createSlice({
  name : 'currentUser',
  initialState : {email : '', name : '', nickname : ''},
  reducers : {
    setUser(state, action) {
      const {email, name, nickname} = action.payload;
      state.email = email;
      state.name = name;
      state.nickname = nickname;
      console.log(state.email + " " + state.name + " " + state.nickname);
    }
  }
})

export let { setUser } = currentUser.actions

export default currentUser;