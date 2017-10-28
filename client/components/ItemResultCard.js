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
      <h1>{ name }</h1>
      <div>{ item ? <img src={isVegan(item.healthLabels)} width="50" /> : null }</div>
      <div>
        {
          item && JSON.stringify(item, null, 2)
        }
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
