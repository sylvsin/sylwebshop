/*jshint esversion: 6 */
/*jshint esversion: 8 */
import { FETCH_PRODUCTS, FILTER_PRODUCT }  from '../types';

export const fetchProducts = () => async(dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type:FETCH_PRODUCTS,
        payload: data,
    });
};

export const onFilterProduct = (filter)=> async(dispatch)=>{
    const res = await fetch("/api/products");
    const data = await res.json();

    dispatch({
        type:FILTER_PRODUCT,
        payload: data.products.filter((product) => filter === "ALL"? true
        : product.availableSizes.indexOf(filter)>=0)
    })  
}
