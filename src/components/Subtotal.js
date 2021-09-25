import React,{useContext} from "react";
import "./css/subtotal.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./contexts/orderState";
import { useHistory} from "react-router-dom";
import orderContext from "./contexts/orderContext"

const Subtotal = () => {
  const history = useHistory()
  const  { orders } = useContext(orderContext)
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({orders.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(orders)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={e=> history.push("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
