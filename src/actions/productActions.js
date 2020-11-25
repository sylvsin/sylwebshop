/*jshint esversion: 6 */
/*jshint esversion: 8 */
import { FETCH_PRODUCTS }  from '../types';

export const fetchProducts = () => async(dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    // console.log(data);
    dispatch({
        type:FETCH_PRODUCTS,
        payload: data,
    });
    console.log(data);
};


