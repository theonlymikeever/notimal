import React from 'react'
import {connect} from 'react-redux'
import { searchRecipe } from '../store'

const RecipeSearch = (props) => {
  const { handleSubmit } = props
  console.log('recipe:', props.recipe)
  return (
    <form onSubmit={ handleSubmit }>
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
      console.log('you searched: ', evt.target.query.value)
      dispatch(searchRecipe(evt.target.query.value))
    }
  }
}

export default connect(mapState, mapDispatch)(RecipeSearch)
