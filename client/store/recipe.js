import axios from 'axios'
import history from '../history'

const appId = process.env.appId || null
const appKey = process.env.appKey || null

//Action Types
const GET_RECIPE = 'GET_RECIPE'

//INTIAL STATE
const defaultRecipe = {}

//ACTION CREATORS
const getRecipe = recipe => ({ type: GET_RECIPE, recipe })

//THUNK CREATORS
export const searchRecipe = (query) => {
  return dispatch =>
    axios.get(`https://api.edamam.com/search?q=${ query }&app_id=${ appId }&app_key=${ appKey }&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`)
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
