import React from 'react'
import { connect } from 'react-redux'
import { isVegan } from '../helpers'


const ItemResultCard = (props) => {
  const { item } = props
  const name = item && item.ingredients
              ? item.ingredients[0].parsed[0].food
              : 'loading'
  return (
    <div>
        <div className="card">
          <h4 className="card-header">{ name }</h4>
          <div className="card-body">
            <h4 className="card-title">
              { item
                ? <span><img src={isVegan(item.healthLabels)} width="35" className="mr-1" />{ isVegan(item.healthLabels) ? 'Vegan' : 'Not-Vegan'}</span>
                : null
              }
            </h4>
            <p className="card-text">{item.length && item.calories}</p>
            <div className="row">
            <span>JSON.stringify(item.totalNutrients, null, 2)</span>
              {
                item.totalNutrients.map(nutr => {
                  return (
                    <div key={nutr.uri} className="card text-white bg-success mb-2">
                      <div className="card-header">{nutr.label}</div>
                      <div className="card-body">
                        <p className="card-text">{nutr.quantity.toFixed(2)}{nutr.unit}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <span>full data for build:</span>
        {
          item && JSON.stringify(item, null, 2)
        }
    </div>
  )
}

const mapState = ({ item }) => {
  return {
    item: item.foundItem
  }
}

export default connect(mapState)(ItemResultCard)
