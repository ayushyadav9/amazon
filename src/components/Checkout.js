import React,{useContext} from "react";
import "./css/checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import orderContext from "./contexts/orderContext"

const Checkout = () => {
    const { orders } = useContext(orderContext)
  
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {localStorage.getItem("email")? localStorage.getItem("email"):'Guest'}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {orders.map((item,i) => (
            <CheckoutProduct
              key = {i}
              id={item._id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};

export default Checkout;
