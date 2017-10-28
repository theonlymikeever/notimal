import React from 'react'
import { connect } from 'react-redux'
import { findItem } from '../store'

const ItemSearch = (props) => {
  const { handleSubmit, items } = props

  return (
    <div>
    <form onSubmit={ handleSubmit }>
      <label>search:</label>
      <input name="query" />
    </form>
    <ul>
      {
        items.length && items.map((item, i) => {
          return (
            <li key={i}>
              {item.food.label}
              <form><input name="food" /></form>
              <ul>
                {
                  item.measures.length && item.measures.map((m, n) => {
                    return (<li key={n}>{m.label}</li>)
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

const mapState = ({ item }) => {
  return {
    items: item.items
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('you searched: ', evt.target.query.value)
      dispatch(findItem(evt.target.query.value))
    }
  }
}

export default connect(mapState, mapDispatch)(ItemSearch)
