import React from 'react'
import {connect} from 'react-redux'
import { searchRecipe } from '../store'

const RecipeSearch = (props) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <p>hey</p>
      <label>search:</label>
      <input name="query" />
    </form>
  )
}

const mapState = ({recipe}) => {
  return {
    recipe
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('you searched: ', evt.query)
      dispatch(searchRecipe(evt.query))
    }
  }
}

export default connect(mapState, mapDispatch)(RecipeSearch)
