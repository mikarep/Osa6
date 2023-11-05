import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
      const message = 'you created ' + '\'' + content + '\''
      dispatch(setNotification(message, 5))
      /*dispatch(setMessage('you created ' + '\'' + content + '\''))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 5000)*/
    }
  
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">create</button>
            </form>
        </div>
    )
  }
  
  export default AnecdoteForm