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
              ? item.image
              : 'http://www.foodista.com/sites/default/files/default_images/placeholder_rev.png'
  return (
  <div className="card">
    <h4 className="card-header">
    { item
      ? <span><img src={isVegan(item.healthLabels) ? 'images/broccoli.png' : '/images/steak.png'} width="35" className="mr-1" />{ isVegan(item.healthLabels) ? 'Vegan' : 'Not-Vegan'}</span>
      : null
    }
    </h4>
    <div className="card-body">
      <div className="row mb-1">
        <div className="col-sm-4">
          <img src={image} className="img-fluid mt-1 mb-2" />
        </div>
        <div className="col-sm-8">
          <button className="btn btn-warning m-1 float-right">
              Calories <span className="badge badge-light">{item.calories}</span>
            </button>
          <h4 className="card-title mt-1">{ name }</h4>
          <p className="card-text pt-2"><strong>Ingredients:</strong>{ingredients}</p>
          <div className="row mt-3">
            {
              nutrients.map((nutr, i) => {
                return (
                  <button key={i} type="button" className="btn btn-success m-1 col-sm-5">
                    {nutr.label} <span className="badge badge-light">{nutr.quantity.toFixed(0, 2)}{nutr.unit}</span>
                  </button>
                )
              })
            }
          </div>
        </div>
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
