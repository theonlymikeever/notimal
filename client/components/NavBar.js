import React from 'react';
import { NavLink } from 'react-router-dom'

function NavBar(props){
  const {handleClick, isLoggedIn} = props

return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <span><img src="/logo.png" className="logo" /></span>
      <a className="navbar-brand" href="#">notimal</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mr-auto">
          <div className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/search">items</NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to="/search/recipes">recipes</NavLink>
          </div>
          <div className="nav-item">
            <NavLink activeClassName="active" className="nav-link" exact to="#">about</NavLink>
          </div>
        </div>
        <div className="pull-right">
          <div className="nav-item mr-2">
          {
            isLoggedIn
              ? <div>
                  <a onClick={handleClick}>logout</a>
                  <small className="text-muted ml-2">v1.0</small>
                </div>
              : <div>
                  <NavLink to='/login'>Login</NavLink>
                  <NavLink to='/signup'>Sign Up</NavLink>
                  <small className="text-muted ml-2">v1.0</small>
                </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
