import React,{ useState,useContext,useEffect } from 'react'
import "./css/payment.css";
import { Link,useHistory} from "react-router-dom";
import { getBasketTotal } from "./context/reducer";
import CheckoutProduct from "./CheckoutProduct";
import {  useElements, CardElement, useStripe } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import orderContext from "./contexts/orderContext"



const Payment = () => {
    const  { orders,addBOrder } = useContext(orderContext)

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    const history = useHistory();

    // useEffect(() => {
    //     const getClientSecteret = async () => {
    //         const response = await fetch(`http://localhost:5000/api/bought/payments/create?total=${getBasketTotal(orders) * 100}`, {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //               "auth-token": localStorage.getItem('token')
    //             },
    //           });
    //         setClientSecret(response.data.clientSecret)
    //     }
    //     getClientSecteret();
    // }, [orders])


    const handleSubmit = async (e)=> {
        e.preventDefault();
        setProcessing(true);
        // const payload = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({ paymentIntent }) => {

            // db.collection("users")
            //     .doc(user?.uid)
            //     .collection("orders")
            //     .doc(paymentIntent.id)
            //     .set({
            //         basket: basket,
            //         amount: paymentIntent.amount,
            //         created: paymentIntent.created
            //     })
            const  item = []
            for(let i=0;i<orders.length;i++){
                item.push({
                    title: orders[i].title,
                    price: orders[i].price,
                    rating: orders[i].rating,
                    image: orders[i].image
                })
            }
            addBOrder(item);
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            history.replace("/orders");
        // })


    }
    const handleChange = (e)=> {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }
    return (
             <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{orders?.length} items</Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Deliver Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>Ayush</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles ,CA</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {orders.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                hideButton={true}
                            />
                        ))}
                    </div>

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form  onSubmit={handleSubmit}>
                           
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>
                                                Order total : {value}
                                            </h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(orders)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹ "}
                                />

                                <button type="submit" disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
