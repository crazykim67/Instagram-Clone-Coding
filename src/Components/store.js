import { configureStore } from "@reduxjs/toolkit";
import currentUser from './userSlice.js'


export default configureStore({
  reducer: {
    currentUser : currentUser.reducer
  }
})

