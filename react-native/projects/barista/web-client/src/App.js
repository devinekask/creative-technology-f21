import "./App.css";

import { useState } from "react";

import coffeeMaker from "./assets/img/coffee-maker.jpg";
import coffeeMaker2x from "./assets/img/coffee-maker@2x.jpg";
// import coffeeData from "./assets/data/coffees.json";

import CoffeeItem from "./components/CoffeeItem";
import OrderItem from "./components/OrderItem";
import useFetch from "./hooks/useFetch";
import OrderForm from "./components/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);

  const [data, loading, error] = useFetch(`${process.env.REACT_APP_API_URL}/coffees`);

  const handleOnOrder = async (client) => {
    const orderData = { ...client, orderItems: orders };

    const resp = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      setOrders([]);
    }
  };

  const addToOrder = (coffee) => {
    // We make a copy of our orders
    const tmp = [...orders];

    // Has this coffee already been ordered?
    const index = orders.findIndex((check) => check.coffee.id === coffee.id);
    if (index >= 0) {
      //already ordered
      tmp[index] = {
        ...tmp[index],
        amount: tmp[index].amount + 1,
      };
    } else {
      //Nope: new order
      const newOrder = {
        amount: 1,
        coffee: coffee,
      };
      tmp.push(newOrder);
    }

    setOrders(tmp);
  };

  const removeOrder = (orderToRemove) => {
    // We make a copy of our orders
    let tmp = [...orders];

    // Remove coffee by filtering it out
    tmp = tmp.filter((order) => {
      return orderToRemove.coffee.id !== order.coffee.id;
    });

    setOrders(tmp);
  };

  const calculateTotal = () =>
    orders.reduce((total, order) => {
      return total + order.coffee.price * order.amount;
    }, 0);

  if (error) return <p>Er is een fout opgetreden...</p>;

  return (
    <div className="App">
      <main className="layout">
        <header className="header highlight spaced">
          <div className="header__titles">
            <p className="h2-like">The Plant-Based Barista</p>
            <h1 className="h1-like">What do you want to order?</h1>
          </div>
        </header>
        <section className="prices highlight spaced">
          <h2 className="visually-hidden">Price list</h2>
          <ul className="prices__list">
            {
              loading
                ? <p>Coffees are brewing...</p>
                : data.map((coffee) => (
                  <CoffeeItem
                    key={coffee.id}
                    coffee={coffee}
                    onAdd={addToOrder}
                  ></CoffeeItem>
                ))
            }
          </ul>
        </section>
        <section className="content spaced">
          <h2 className="title_mini">Order</h2>
          <div className="orders__wrapper">
            <ul className="orders">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <OrderItem
                    order={order}
                    key={index}
                    onRemoveOrder={removeOrder}
                  ></OrderItem>
                ))
              ) : (
                  <li>
                    <div className="emptystate">
                      <img
                        srcSet={`${coffeeMaker} 67w, ${coffeeMaker2x} 134w`}
                        sizes="67px"
                        src={coffeeMaker}
                        alt="A coffee maker"
                      />

                      <span className="emptystate__content">
                        Please order something
                      <span role="img" aria-label="Drunk emoji">
                          🤪
                      </span>
                      </span>
                    </div>
                  </li>
                )}
            </ul>
            <div className="total">
              <span className="total__label">Total price</span>
              <span className="total__price">
                &euro;<span>{calculateTotal()}</span>
              </span>
              <OrderForm onOrder={handleOnOrder} enabled={orders.length > 0} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
