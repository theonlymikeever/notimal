import React from 'react'
import {connect} from 'react-redux'
import { searchRecipe } from '../store'
import RecipeResultCard from './RecipeResultCard'

const RecipeSearch = (props) => {
  const { handleSubmit, recipe } = props
  console.log('recipes returned:', recipe)
  return (
  <div>
    <form onSubmit={ handleSubmit }>
      <label>search:</label>
      <input name="query" />
    </form>
    <h3>Results:</h3>
    <RecipeResultCard recipe={ recipe } />
  </div>
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
