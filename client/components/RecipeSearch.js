import React from 'react'
import {connect} from 'react-redux'
import { searchRecipe } from '../store'
import RecipeResultCard from './RecipeResultCard'

const RecipeSearch = (props) => {
  const { handleSubmit, recipe } = props
  console.log('recipes returned:', recipe)
  return (
  <div>
    <form onSubmit={ handleSubmit } className="mb-3">
      <div className="inputgroup col-12">
        <input name="query" />
        <span className="highlight" />
        <span className="bar" />
        <label>Search Recipe</label>
      </div>
    </form>
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
      evt.target.query.value = '' //reset form
    }
  }
}

export default connect(mapState, mapDispatch)(RecipeSearch)
