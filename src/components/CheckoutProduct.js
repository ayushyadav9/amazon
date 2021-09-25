import React,{useContext} from "react";
import './css/checkoutProduct.css'
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import orderContext from "./contexts/orderContext"

const CheckoutProduct = (props) => {
    const { deleteOrder,addBOrder } = useContext(orderContext)
    const {id, title, image, price, rating, hideButton  } = props;

    if(hideButton){
        addBOrder(title, price, rating, image)
    }
    const removeFromBasket = () => {
        deleteOrder(id)
    }
    
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt=""/>

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key = {i}><StarIcon sx={{ color: yellow[700] }}></StarIcon></p>
                    ))}
                </div>
                {!hideButton && (
                    <button className="btn3" onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
