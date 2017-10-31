import React from 'react'
import { connect } from 'react-redux'
import { isVegan } from '../helpers'

const RecipeResultCard = (props) => {
  console.log('props:',props)
  return (
  <table className="table table-striped table-success">
    <thead>
      <tr>
        <th>Recipe</th>
        <th>Vegan</th>
      </tr>
    </thead>
  {
    props.recipe && props.recipe.hits
      ? props.recipe.hits.map((res, i) => {
        let vegan = isVegan(res.recipe.healthLabels)
        return (
        <tbody key={i}>
          <tr>
            <th>{ res.recipe.label }</th>
            <td><img src={ vegan ? 'images/broccoli.png' : '/images/steak.png'} width="45" className="mr-1" />{ vegan ? 'Vegan' : 'Not-Vegan'}</td>
          </tr>
      </tbody>
        )
      })
      : null
  }
  </table>
  )
}

export default RecipeResultCard
