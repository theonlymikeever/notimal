import React from 'react'
import { connect } from 'react-redux'
import { findItem, getItemInfo } from '../store'
import { isVegan } from '../helpers'

const ItemSearch = (props) => {
  const { handleSubmit, handleClick, items } = props

  return (
    <div>
    <form onSubmit={ handleSubmit } >
      <div className="inputgroup col-12">
        <input name="query" />
        <span className="highlight" />
        <span className="bar" />
        <label>Search</label>
      </div>
    </form>
    <div className="card-deck">
      {
        items.length && items.map((item, i) => {
          return (
          <form onSubmit={ handleClick } key={i} className="form-inline">
          <div className="card mb-3">
          <img className="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap" />
            <div className="card-body" value={item.food.uri} name="item">
              <h4 className="card-title">{item.food.label}</h4>
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
              <button className="btn btn-success float-right" name="item" value={item.food.uri}>Select</button>
            </div>
          </div>
          </form>
          )
        })
      }
    </div>
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
