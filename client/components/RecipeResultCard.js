import React from 'react'
import { connect } from 'react-redux'
import { isVegan } from '../helpers'

const RecipeResultCard = (props) => {
  console.log('props:',props)
  return (
  <div>
  <ul>
  {
    props.recipe && props.recipe.hits
      ? props.recipe.hits.map((res, i) => {
        let vegan = isVegan(res.recipe.healthLabels, res.recipe.ingredients)
        console.log(vegan)
        return (
          <li key={i}>{ res.recipe.label } - <img src={ vegan ? 'images/broccoli.png' : '/images/steak.png'} width="45" className="mr-1" />{ vegan ? 'Vegan' : 'Not-Vegan'}</li>
        )
      })
      : null
  }
  </ul>
  </div>
  )
}

export default RecipeResultCard
