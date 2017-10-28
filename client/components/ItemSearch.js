import React from 'react'
import { connect } from 'react-redux'
import { findItem } from '../store'

const ItemSearch = (props) => {
  const { handlesubmit, items } = props

  return (
    <div>
    <ul>
      {
        items && items.map((item, i) => {
          return (
            <li key={i}>
              item.food.label
              <ul>
                {
                  item.measures && item.measures.map((m, n) => {
                    return (<li key={n}>m && m.label</li>)
                  })
                }
              </ul>
            </li>
          )
        })
      }
    </ul>
    </div>
  )
}

const mapState = ({ items}) => {
  return {
    items
  }
}

const mapDispatch = (dispatch) => {
  return {
    handlesubmit(evt) {
      evt.preventDefault()
      console.log('you searched: ', evt.target.query.value)
      dispatch(findItem(evt.target.query.value))
    }
  }
}

export default connect(mapState, mapDispatch)(ItemSearch)
