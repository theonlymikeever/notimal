import React from 'react'
import { connect } from 'react-redux'
import { isVegan, toTitleCase } from '../helpers'


const ItemResultCard = (props) => {
  //this needs ot be cleaned up
  const { item } = props
  const name = item && item.ingredients
              ? item.ingredients[0].parsed[0].food
              : 'loading'
  const ingredients = item && item.ingredients[0].parsed[0].foodContentsLabel
              ? toTitleCase(item.ingredients[0].parsed[0].foodContentsLabel)
              : 'N/A'
  const nutrients = item && item.totalNutrients
              ? Object.keys(item.totalNutrients).map(key => item.totalNutrients[key])
              : 'N/A'
  const image = item && item.image
              ? 'item.image'
              : 'http://www.foodista.com/sites/default/files/default_images/placeholder_rev.png'
  return (
  <div className="card">
    <h4 className="card-header">{ name }</h4>
    <div className="card-body">
      <h4 className="card-title">
        { item
          ? <span><img src={isVegan(item.healthLabels)} width="35" className="mr-1" />{ isVegan(item.healthLabels) ? 'Vegan' : 'Not-Vegan'}</span>
          : null
        }
      </h4>
      <p className="card-text">Ingredients: {ingredients}</p>
      <div className="row">
        {
          nutrients.map((nutr, i) => {
            return (
              <button key={i} type="button" className="btn btn-success m-1">
                {nutr.label} <span className="badge badge-light">{nutr.quantity.toFixed(0, 2)}{nutr.unit}</span>
              </button>
            )
          })
        }
      </div>
    </div>
  </div>
  )
}

const mapState = ({ item }) => {
  return {
    item: item.foundItem
  }
}

export default connect(mapState)(ItemResultCard)
