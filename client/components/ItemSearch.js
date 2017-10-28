import React from 'react'
import { connect } from 'react-redux'
import { findItem, getItemInfo } from '../store'

const ItemSearch = (props) => {
  const { handleSubmit, handleClick, items } = props

  return (
    <div>
    <form onSubmit={ handleSubmit } className="form" >
      <input name="query" className="form-control" placeholder={'search an item'} />
    </form>
    <ul>
      {
        items.length && items.map((item, i) => {
          return (
            <form onSubmit={ handleClick } key={i}>
            <li value={item.food.uri} name="item">
              {item.food.label}
              <ul>
                <select name="measurement">
                {
                  item.measures.length && item.measures.map((m, n) => {
                    return (
                      <option
                        key={n}
                        value={m.uri}>
                        {m.label}
                      </option>
                    )
                  })
                }
                </select>
                <button name="item" value={item.food.uri}>Submit</button>
              </ul>
            </li>
            </form>
          )
        })
      }
    </ul>
    </div>
  )
}

const mapState = ({ item }) => {
  return {
    items: item.items,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt){
      evt.preventDefault()
      const body = {
        foodURI: evt.target.item.value,
        measureURI: evt.target.measurement.value
      }
      dispatch(getItemInfo(body))
    },
    handleSubmit(evt) {
      evt.preventDefault()
      dispatch(findItem(evt.target.query.value))
      evt.target.query.value = '' //reset form
    }
  }
}

export default connect(mapState, mapDispatch)(ItemSearch)
