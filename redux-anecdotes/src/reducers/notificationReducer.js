import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      console.log('action: ', action.payload)
      state.message = action.payload
    },
  },
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (content, content2) => {
  return async dispatch => {
    const message = content
    const time = content2 * 1000
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, time)
  }
}

export default notificationSlice.reducer