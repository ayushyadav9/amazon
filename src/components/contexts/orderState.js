import OrderContext from "./orderContext";
import { useState } from "react";

export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

const OrderState = (props) => {
  const host = "http://localhost:5000";
  const ordersInitial = [];
  const boughtInitial = [];

  const [orders, setorders] = useState(ordersInitial);
  const [bought, setbought] = useState(boughtInitial);
  const [log, setlog] = useState(localStorage.getItem('token')?true:false)
  

  
  const getOrders = async () => {
    const response = await fetch(`${host}/api/orders/fetchOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setorders(json);
  };

  const getBOrders = async () => {
    const response = await fetch(`${host}/api/bought/fetchOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setbought(json);
  };



  //Add a note
  const addOrder = async (title, price, rating, image) => {
    const response = await fetch(`${host}/api/orders/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, price, rating, image }),
    });
    const order = await response.json();
    setorders(orders.concat(order));
  };

  const addBOrder = async (item) => {
    const response = await fetch(`${host}/api/bought/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      
      body: JSON.stringify({ item }),
    });
    const order = await response.json();
    setbought(bought.concat(order));
  };



  //Delete a note
  const deleteOrder = async (id) => {
    const response = await fetch(`${host}/api/orders/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);

    const newOrder = orders.filter((order) => {
      return order._id !== id;
    });
    setorders(newOrder);
  };

  return (
    <OrderContext.Provider value={{ orders, setorders, addOrder,deleteOrder,getOrders, log, setlog , addBOrder,getBOrders,bought,setbought }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
