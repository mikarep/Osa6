import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [message, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newMutation = useMutation({mutationFn: createAnecdote, 
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  },
  onError: () => {
    const mes = 'too short anecdote, must have lenght 5 or more'
    dispatch({type: 'show', message: mes})
    setTimeout(() => {
      dispatch({type: 'hide'})
    }, 5000)
  }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({content, votes: 0})
    const mes = 'created "' + content + '"'
    dispatch({type: 'show', message: mes})
    setTimeout(() => {
      dispatch({type: 'hide'})
    }, 5000)
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
