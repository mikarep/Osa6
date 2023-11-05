import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdotesToChange = state.find(n => n.id === id)
      const changedAnecdotese = { 
        ...anecdotesToChange, 
        votes: anecdotesToChange.votes + 1 
      }
      return state.map(anecdotes =>
        anecdotes.id !== id ? anecdotes : changedAnecdotese 
      )
    case 'NEW':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdotes = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}*/

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdotes: (state, action) => {
      const id = action.payload.id
      
      const changedAnecdotese = action.payload
      
      return state.map(anecdotes =>
        anecdotes.id !== id ? anecdotes : changedAnecdotese 
      )
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteAnecdotes, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const anecdote = await anecdotes.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotes.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdotes.updateAnecdote(content)
    dispatch(voteAnecdotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer