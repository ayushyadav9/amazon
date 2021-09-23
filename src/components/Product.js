import React from "react";
import "./css/product.css";
import { useStateValue } from "./context/StateProvider";
import Noty from "noty";
import "../../node_modules/noty/lib/noty.css"
import "../../node_modules/noty/lib/themes/mint.css"
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const Product = (props) => {
  const [, dispatch] = useStateValue();
  const {id, title, image, price, rating } = props;
  // console.log(basket)

  const addToBasket = () => {
    // dispatch the item into the data layer
    new Noty({
      type:"success",
      layout:"topRight",
      text:`<div class="noty__container"><img src=${image}> ${title} has been added to basket</div>`,
      timeout:500,
    }).show();
    
    
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
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
