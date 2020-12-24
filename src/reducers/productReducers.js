/*jshint esversion: 6 */
const { FETCH_PRODUCTS, FILTER_PRODUCT, SORT_PRODUCT} = require("../types");

export const productsReducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_PRODUCTS:
            return {items: action.payload };
        case FILTER_PRODUCT:            
            return {...state,items: action.payload }
        case SORT_PRODUCT:            
            return {...state,items: action.payload }
        default:
            return state;
    }
}