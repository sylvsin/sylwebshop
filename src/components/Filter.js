import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FILTER_PRODUCT, SORT_PRODUCT } from '../types';


 class Filter extends Component {
  constructor() {
    super();
    this.state = {
      size: '',
      sort:''
    };
  }
  onFilterProduct({target:{value:filter}}){
    fetch("/api/products").then(v=>{ 
      return v.json()}).then(data=>{
        this.props.onFilterProduct(data.filter((product) => filter === "ALL"? true
        : product.availableSizes.indexOf(filter)>=0))
      
    });
    this.setState(prevState=>({...prevState,size:filter}))    
  }
  onSortProducts({target:{value:sort}}){
    fetch("/api/products").then(v=>{
      return v.json()}).then(data=>{
        this.props.onSortProducts(data.slice().sort((a, b) => (
          sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a.id < b.id
            ? 1
            : -1
        )))
    });
  
    // this.props.onSortProducts(sortedProducts)
    this.setState(prevState=>({...prevState,sort}))    
  }

  render() {
    return (
        <div className="filter">

            <div className="filter-result">
              {this.props.products.length} Products
            </div>

            <div className="filter-sort">
              Order{" "}
              <select value={this.state.sort} onChange={(e)=>this.onSortProducts(e)}>
                  <option>Latest</option>
                  <option value="lowest">Lowest</option>
                  <option value="highest">Highest</option>
              </select>
            </div>

            <div className="filter-size">
              Filter{" "}
              <select value={this.state.size} onChange={(e)=>{
                this.onFilterProduct(e)}}>
                <option>ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
        </div>
    );
  }
}

export default connect((state) => {
  return ({products: state.products.items??[]})}, 
  (dispatch)=>({
  onFilterProduct: (payload)=>{
    dispatch({type:FILTER_PRODUCT,payload})
  },
  onSortProducts: (payload)=>{

    dispatch({type:SORT_PRODUCT, payload})
  }
}))(Filter);

