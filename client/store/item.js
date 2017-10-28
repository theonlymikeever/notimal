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
const getItems = search => ({ type: GET_ITEMS, search })
const getItem = search => ({ type: GET_ITEM, search })

//THUNK CREATORS
export const findItem = (query) => {
  return (dispatch) => {
    axios.get(`/api/nutrition/?ing=${ query }`)
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
      return action.items
    case GET_ITEM:
      return action.item
    default:
      return state;
  }
}
