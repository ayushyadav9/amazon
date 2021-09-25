import React,{useContext} from "react";
import "./css/product.css";
import Noty from "noty";
import "../../node_modules/noty/lib/noty.css"
import "../../node_modules/noty/lib/themes/mint.css"
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import orderContext from "./contexts/orderContext"

const Product = (props) => {
  const  context = useContext(orderContext)
  const { addOrder,log} = context;

  const {id, title, image, price, rating } = props;
  // console.log(basket)

  const addToBasket = () => {
    // dispatch the item into the data layer
    if(log){
        new Noty({
        type:"success",
        layout:"topRight",
        text:`<div class="noty__container"><img src=${image}> ${title} has been added to basket</div>`,
        timeout:500,
      }).show();
      
      addOrder(title, price, rating, image);
    }
    else{
      alert("Login First please")
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key = {i}><StarIcon sx={{ color: yellow[700] }}></StarIcon></p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button className="btn3" onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
