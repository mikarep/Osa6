import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from "react"
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from "./NotificationContext"
import axios from 'axios'

const App = () => {

  const queryClient = useQueryClient()
  const updateMutation = useMutation({mutationFn: updateAnecdote, onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }})

  const [message, dispatch] = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    const mes = 'voted "' + anecdote.content + '"'
    dispatch({type: 'show', message: mes})
    setTimeout(() => {
      dispatch({type: 'hide'})
    }, 5000)
    console.log('vote')
  }

  /*const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]*/

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
