import React, { Component } from "react"; 
import { Link, NavLink, Redirect } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
class Navigation extends Component {
  state = {
    query: "",
    results: [],
    items: []
  }

  handleChange = (query) => {
    this.setState({query})
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { query,items } = this.state;
    const filterItems = items.filter( (item)=>{
      if (
        item.name.toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query) ||
        item.shelf.toLowerCase().includes(query)
      ) {
        return item;
      }
      return 0
    })

    this.setState({
      ...this.state,
      query: "",
      results: filterItems
    })
    //redirect to /search pass filterItems, then display items on /search
  }
  componentDidMount(){
    fetch("/product")
    .then(res => res.json())
    .then(products => {
      this.setState({
        ...this.state,
        items: products
      })
    })
  }
  
  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Get<b>It</b></Link>  		
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
            {/* <NavLink to="/about-us" className="nav-item nav-link">About</NavLink>			 */}
            <div className="nav-item dropdown">
              <div  data-toggle="dropdown" className="nav-item nav-link dropdown-toggle">Closet</div>
              <div className="dropdown-menu">					
                <Link to="/products?shelf=jacket"className="dropdown-item">Jackets</Link>
                <Link to="/products?shelf=bottom" className="dropdown-item">Bottoms</Link>
                <Link to="/products?shelf=tee" className="dropdown-item">Tees</Link>
                <Link to="/products?shelf=accessory" className="dropdown-item">Accessories</Link>
                      </div>
                  </div>
            {/* <Link to="/contact" className="nav-item nav-link">Contact</Link> */}
          </div>
          <form className="navbar-form form-inline">
            <div className="input-group query-box">								
              <input 
                type="text" 
                id="query" 
                className="form-control" 
                placeholder="Search here..." 
                onChange={(e) => this.handleChange(e.target.value.toLowerCase())}
                value={this.state.query} 
                />
              <div className="input-group-append" style={{marginLeft: "10px", marginRight: "10px", height: "45px",}}>
                <span className="input-group-text">
                  <button className="btn btn-primary"  disabled={!this.state.query} onClick={(e) => this.handleSubmit(e)}>
                    <i className="material-icons">&#xE8B6;</i>
                  </button>
                </span>
              </div>
            </div>
          </form>
          {this.state.results.length > 0 &&
          <Redirect to={{
            pathname: '/search-results',
            state: { results: this.state.results }
          }}/>
        }
          <div className="navbar-nav ml-auto action-buttons">
              <LoginButton />
              <LogoutButton />
              <Link to="/cart" className="nav-link dropdown-toggle mr-4">Shopping bag {JSON.parse(localStorage.getItem('cart')) && (<span>({Object.keys(JSON.parse(localStorage.getItem('cart'))).length})</span>)}</Link>
              <Profile />
          </div>
        </div>
      </nav>
  )
  }
}
export default Navigation;