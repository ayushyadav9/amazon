import React from "react";
import { useStateValue } from "./context/StateProvider";
// import { IconButton } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import "./css/cartOverlay.css";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CartOverlay = () => {
  const [{ showCart, basket }, dispatch] = useStateValue();
  const handleDisplayCatrt = () => {
    dispatch({
      type: "SHOW_CART",
      showCart: false,
    });
  };

  const addQauantity = (item) => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: item,
      });
  };

  const removeQauantity = (item) => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: item,
      });
  };

  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const getTotal = () => {
    return basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearBasket = () => {
    dispatch({
      type: "CLEAR_BASKET",
    });
  };

  return (
    <div>
      <div className="cart__overlayshowCart">
        <div className="cart">
          <div className="cart__header">
            <button onClick={handleDisplayCatrt}>
              <CloseIcon />
            </button>

            <h2>Your Cart </h2>
          </div>

          {basket.map((item, id) => (
            <div key={id} className="cart__body">
              <img src={item.image} alt="" />
              <div className="cart__info">
                <h2>{item.title}</h2>
                <p>£{item.price}</p>
                <button onClick={() => removeFromBasket(item.id)}>
                  Remove
                </button>
              </div>
              <div className="cart__right">
                <button onClick={() => addQauantity(item)}>
                  <ExpandLessIcon />
                </button>
                <h2>{item.quantity}</h2>
                <button onClick={() => removeQauantity(item)}>
                  <ExpandMoreIcon />
                </button>
              </div>
            </div>
          ))}

          {basket.length > 0 && (
            <div className="cart__footer">
              <h2>Your total: £{getTotal()}</h2>
              <button onClick={clearBasket}>Clear Basket</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
