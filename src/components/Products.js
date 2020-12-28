/*jshint esversion: 6 */
import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import {addToCart} from '../actions/cartActions';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }
    

    componentDidMount() {
        this.props.fetchProducts();
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach(item => {
          if(item._id === product._id) {
            item.count++;
            alreadyInCart = true;
          }
        });
        if(!alreadyInCart) {
          cartItems.push({...product, count: 1});
        }
        this.setState({cartItems});
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    openModal = (product) => {
        this.setState({ product });
    };

    closeModal = () => {
        this.setState({ product: null });
    };
    render(){
        const { product } = this.state;

        return (
        <div>
            <Fade bottom cascade> 
                {
                    !this.props.products ? (
                        <div>Loading</div>
                    ) : (
                        <ul className="products">
                            {
                                this.props.products.map((product) => (
                                    <li key={product._id}>
                                        <div className="product">
                                            <a href={"#" + product._id} onClick={() => this.openModal(product)}>

                                                <img src={product.image} alt={product.title} />
                                                
                                                <p>
                                                    {product.title}
                                                </p>
                                            </a>
                                            
                                            <div className="product-price">
                                                <div>
                                                    {formatCurrency(product.price)}
                                                </div>

                                                
                                                <button onClick={() => this.props.addToCart(product)} className="button primary">
                                                    Add To Cart
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </li>
                            ))}
                        </ul>
                    )
                }
                
            </Fade>
            {
                product && (
                    <Modal 
                        isOpen={true}
                        onRequestClose={this.state.closeModal}
                    >
                        <Zom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}></img>
                                <div className="product-details-description">
                                    <p><strong>{product.title}</strong></p>
                                    <p>{product.description}</p>
                                    <p>Available sizes</p>
                                    <p>
                                        {
                                            product.availableSizes.map(X=>(
                                                <span>
                                                    {" "} 
                                                    <button className="button">{X}</button>
                                                </span>
                                                )
                                            )
                                        
                                        }
                                    </p>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button className="button primary" onClick={()=>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zom>
                    </Modal>
                )
            }
        </div>
        );
    }
}
export default connect(
    (state) => ({products: state.products.items}), 
    {   fetchProducts, 
        addToCart
    })(Products);
