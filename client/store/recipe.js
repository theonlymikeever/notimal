import axios from 'axios'
import history from '../history'

//Action Types
const GET_RECIPE = 'GET_RECIPE'

//INTIAL STATE
const defaultRecipe = {}

//ACTION CREATORS
const getRecipe = recipe => ({ type: GET_RECIPE, recipe })

//THUNK CREATORS
export const searchRecipe = (query) => {
  return dispatch =>
    axios.get(`/api/recipe/?f=${ query }`)
      .then(res => {
        dispatch(getRecipe(res.data || defaultRecipe))
      })
      .catch(err => console.log(err))
}

//REDUCER
export default function (state = defaultRecipe, action) {
  switch (action.type){
    default:
      return state;
  }
}
