import React from 'react'
import "./css/orderItem.css"
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format"

const OrderItem = ({order}) => {
    return (
        <div className="order">
            <h2>Order ID</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map(item => (
                <CheckoutProduct
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    price={item.price}
                    image={item.image} rating={item.rating}
                    hideButton

                />
            ))}

            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <h3 className="order__total">
                            Order total : {value}
                        </h3>


                    </>

                )}
                decimalScale={2}
                value={order.data.amount/100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
            />

        </div>
    )
}

export default OrderItem
