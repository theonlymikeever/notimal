import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_ITEMS = 'GET_ITEMS'
const GET_ITEM = 'GET_ITEM'

//INITIAL STATE
const defaultState = {
  items: {},
  foundItem: {}
}

//ACTION CREATORS
const getItems = items => ({ type: GET_ITEMS, items })
const getItem = item => ({ type: GET_ITEM, item })

//THUNK CREATORS
export const findItem = (query) => {
  return (dispatch) => {
    axios.get(`/api/nutrition?ingr=${ query }`)
      .then(res => {
        dispatch(getItems(res.data || defaultState))
      })
      .catch(err => console.log(err))
  }
}
export const getItemInfo = (item) => {
  return (dispatch) => {
    axios.post(`/api/nutrition`, item)
      .then(res => {
        dispatch(getItem(res.data || defaultState))
        history.push(`/scorecard`)
      })
      .catch(err => console.log(err))
  }
}

//REDUCER
export default function (state = defaultState, action){
  switch (action.type){
    case GET_ITEMS:
      return Object.assign({}, state, {items: action.items})
    case GET_ITEM:
      return Object.assign({}, state, {foundItem: action.item})
    default:
      return state;
  }
}
