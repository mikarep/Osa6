import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote, voteAnecdotes } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { setMessage, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
        return state.anecdote
    }
    
    return state.anecdote.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(updateAnecdote(anecdote))
    const message = 'you voted ' + '\'' + anecdote.content + '\''
    dispatch(setNotification(message, 5))
    /*dispatch(setMessage('you voted ' + '\'' + anecdote.content + '\''))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, 5000)*/
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <Notification/>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
  }
  
  export default AnecdoteList