import React,{ useEffect, useState } from 'react'
import "./css/orders.css";
import { db } from "../firebase"
import { useStateValue } from "./context/StateProvider"
import OrderItem from './OrderItem';

const Orders = () => {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot(snapshot => {

                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))

                    
             })
        } else {
            setOrders([]);
        }
    }, [user])

    useEffect(() => {
        console.log(orders)
    },[orders])

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="oredrs__order">
                {orders?.map(order => (
                    <OrderItem key={order.id} order={order} />

                ))}
            </div>
        </div>
    )
}

export default Orders
