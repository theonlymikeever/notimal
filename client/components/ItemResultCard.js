import React from 'react'
import { connect } from 'react-redux'
import { isVegan, toTitleCase, cleanString } from '../helpers'


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
  const dietLabels = item && item.dietLabels
                   ? item.dietLabels.map(label => toTitleCase(label))
                   : 'N/A'
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
          <p className="card-text pt-2"><strong className="mr-2">Ingredients:</strong>{ingredients}</p>
          <div className="mt-3">
          <strong className="mr-2">Diet Labels:</strong>
          {
            dietLabels.map((label, i) => <span key={i} className="badge badge-pill badge-secondary">{label}</span>)
          }
          </div>
          <div className="mt-3">
            <table className="table table-striped table-success">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  nutrients.map((nutr, i) => {
                    return (
                    <tr key={i}>
                      <th>{nutr.label}</th>
                      <td>{nutr.quantity.toFixed(0, 2)}{cleanString(nutr.unit)}</td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <p className="float-right"><em>* all nutrients are per pound</em></p>
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
