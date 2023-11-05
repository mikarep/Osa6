import { createContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
    switch (action.type) {
      case "show":
          return action.message
      case "hide":
          return ''
      default:
          return state
    }
  }



const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, notificationDispatch] = useReducer(notificationReducer, '')
  
    return (
      <NotificationContext.Provider value={[message, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }
  
  export default NotificationContext