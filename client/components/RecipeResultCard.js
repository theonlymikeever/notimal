import React from 'react'
import { connect } from 'react-redux'

const RecipeResultCard = (props) => {
  const isVegan = (labels) => {
    console.log('searching labels: ', labels)
    if (labels.indexOf('Vegan') !== -1){
      return (<div><img src="/images/broccoli.png" /></div>)
    }
      return 'not-vegan'
  }
  return (
  <div>
  <ul>
  {
    props.recipe && props.recipe.hits
      ? props.recipe.hits.map((res, i) => {
        return (
          <li key={i}>{ res.recipe.label } - { res.recipe.healthLabels ? isVegan(res.recipe.healthLabels) : 'no labels'}</li>
        )
      })
      : '...'
  }
  </ul>
  </div>
  )
}


// const mapState = ({ recipe }) => recipe

// const mapState = ({ recipe }) => {
//   return {
//     recipe
//   }
// }

export default RecipeResultCard
// export default connect(mapState)(RecipeResultCard)
