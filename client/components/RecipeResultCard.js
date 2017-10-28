import React from 'react'
import { connect } from 'react-redux'

const RecipeResultCard = (props) => {
  const isVegan = (labels) => {
    console.log('searching labels: ', labels)
    if (labels.indexOf('Vegan') !== -1){
      return (<img src="/images/broccoli.png" width="50" />)
    }
      return (<img src="/images/steak.png" width="50" />)
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
