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
          let vegan = isVegan(item.healthLabels, item.ingredients[0].parsed[0].foodContentsLabel)
          return (
          <form onSubmit={ handleClick } key={i} className="col-sm-4">
          <div className="card mb-3">
          <img className="card-img-top" src={item.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{item.ingredients[0].parsed[0].food}</h5>
              <div className="mb-3 ml-0"><img src={ vegan ? 'images/broccoli.png' : '/images/steak.png'} width="45" className="mr-1" />{ vegan ? 'Vegan' : 'Not-Vegan'}</div>
              <input className="hidden" name="measurement" value={item.ingredients[0].parsed[0].measureURI} readOnly hidden />
              <button className="btn btn-success btn-block" name="item" value={item.ingredients[0].parsed[0].foodURI}>Select</button>
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
      console.log(body)
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
