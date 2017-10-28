import axios from 'axios'
// import history from '../history'

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
// const getItem = search => ({ type: GET_ITEM, search })

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

//REDUCER
export default function (state = defaultState, action){
  switch (action.type){
    case GET_ITEMS:
      return Object.assign({}, state, {items: action.items})
    case GET_ITEM:
      return action.item
    default:
      return state;
  }
}
